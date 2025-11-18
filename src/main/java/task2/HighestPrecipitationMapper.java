package task2;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

public class HighestPrecipitationMapper
        extends Mapper<LongWritable, Text, Text, Text> {

    @Override
    protected void map(LongWritable key, Text value, Context context) {
        try {
            String line = value.toString();

            if (line.startsWith("location_id")) return; // skip header

            String[] cols = line.split(",");

            int locationId = Integer.parseInt(cols[0].trim());
            String dateStr = cols[1].trim();

            // Parse date — format: MM/DD/YYYY
            String[] dmy = dateStr.split("/");
            int month = Integer.parseInt(dmy[0]);
            int year = Integer.parseInt(dmy[2]);

            double precipitationHours = Double.parseDouble(cols[13].trim()); // precipitation_hours column

            String outKey = year + "," + month;
            String outVal = String.valueOf(precipitationHours);

            context.write(new Text(outKey), new Text(outVal));

        } catch (Exception e) {
            // ignore malformed lines
        }
    }
}
