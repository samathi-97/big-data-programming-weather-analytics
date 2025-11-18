import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

public class DistrictMonthlyStatsMapper
        extends Mapper<LongWritable, Text, Text, Text> {

    @Override
    protected void map(LongWritable key, Text value, Context context)
            throws IOException, InterruptedException {

        String line = value.toString().trim();
        if (line.isEmpty()) {
            return;
        }

        if (line.startsWith("location_id")) {
            return;
        }

        String[] parts = line.split(",");
        // Expect at least 14 columns
        if (parts.length < 14) {
            return;
        }

        try {
            // Columns:
            // 0 = location_id
            // 1 = date (MM/DD/YYYY)
            // 5 = temperature_2m_mean
            // 13 = precipitation_hours
            int locationId = Integer.parseInt(parts[0].trim());
            String dateStr = parts[1].trim();
            double tempMean = Double.parseDouble(parts[5].trim());
            double precipHours = Double.parseDouble(parts[13].trim());

            // Parse month from date MM/DD/YYYY
            String[] dmy = dateStr.split("/");
            if (dmy.length != 3) {
                return;
            }

            int month = Integer.parseInt(dmy[0]);
            if (month < 1 || month > 12) {
                return;
            }

            // Key: "locationId,MM" (e.g., "10,07")
            String outKey = locationId + "," + String.format("%02d", month);

            // Value: "precipHours,tempMean,1"
            String outVal = precipHours + "," + tempMean + ",1";

            context.write(new Text(outKey), new Text(outVal));

        } catch (NumberFormatException e) {
            // Skip bad lines
        }
    }
}
