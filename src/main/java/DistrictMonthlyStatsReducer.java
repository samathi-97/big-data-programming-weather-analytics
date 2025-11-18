import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class DistrictMonthlyStatsReducer
        extends Reducer<Text, Text, Text, Text> {

    private Map<Integer, String> locationNames = new HashMap<>();

    @Override
    protected void setup(Context context) throws IOException, InterruptedException {
        // Read locationData.csv directly from HDFS
        Configuration conf = context.getConfiguration();

        // HDFS path where you put the location data
        Path locPath = new Path("/weather/ref/locationData.csv");

        FileSystem fs = locPath.getFileSystem(conf);

        try (BufferedReader br =
                     new BufferedReader(
                             new InputStreamReader(fs.open(locPath), "UTF-8"))) {

            String line;
            boolean header = true;

            while ((line = br.readLine()) != null) {
                if (header) {       // skip header row
                    header = false;
                    continue;
                }

                String[] parts = line.split(",");
                if (parts.length < 8) {
                    continue;
                }

                try {
                    int locId = Integer.parseInt(parts[0].trim());
                    String cityName = parts[7].trim();
                    locationNames.put(locId, cityName);
                } catch (NumberFormatException e) {
                    // skip bad rows
                }
            }
        }
    }

    @Override
    protected void reduce(Text key, Iterable<Text> values, Context context)
            throws IOException, InterruptedException {

        double totalPrecip = 0.0;
        double tempSum = 0.0;
        int count = 0;

        for (Text v : values) {
            String[] arr = v.toString().split(",");
            if (arr.length != 3) continue;

            totalPrecip += Double.parseDouble(arr[0]);
            tempSum     += Double.parseDouble(arr[1]);
            count       += Integer.parseInt(arr[2]);
        }

        if (count == 0) {
            return;
        }

        double meanTemp = tempSum / count;

        String[] km = key.toString().split(",");
        int loc   = Integer.parseInt(km[0]);
        int month = Integer.parseInt(km[1]);

        String district = locationNames.getOrDefault(loc, "Location " + loc);

        String sentence = String.format(
                "%s had a total precipitation of %.1f hours with a mean temperature of %.1f for month %d",
                district, totalPrecip, meanTemp, month
        );

        context.write(new Text(sentence), new Text(""));
    }
}
