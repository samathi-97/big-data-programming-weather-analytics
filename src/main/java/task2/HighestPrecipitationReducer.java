package task2;

import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class HighestPrecipitationReducer
        extends Reducer<Text, Text, Text, Text> {

    private double maxPrecip = -1;
    private String maxKey = "";

    @Override
    protected void reduce(Text key, Iterable<Text> values, Context context) {
        double sum = 0;

        for (Text v : values) {
            sum += Double.parseDouble(v.toString());
        }

        // Keep track of the maximum
        if (sum > maxPrecip) {
            maxPrecip = sum;
            maxKey = key.toString();
        }
    }

    @Override
    protected void cleanup(Context context) {
        String[] ym = maxKey.split(",");
        int year = Integer.parseInt(ym[0]);
        int month = Integer.parseInt(ym[1]);

        String result = String.format(
                "%d month in %d had the highest total precipitation of %.1f hr",
                month, year, maxPrecip
        );

        try {
            context.write(new Text(result), new Text(""));
        } catch (Exception e) {}
    }
}
