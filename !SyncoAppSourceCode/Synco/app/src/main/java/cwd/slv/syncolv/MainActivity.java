package cwd.slv.syncolv;

import android.app.Activity;
import android.app.Fragment;
import android.content.Intent;
import android.os.Bundle;

import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ExecutionException;

public class MainActivity extends Activity {

    public static final String PREFS_NAME = "MyPrefsFile";

    private ListView listView;
    private CustomListView customListViewAdapter;
    public String[] titles;
    public String[] scores;
    public String[] commentCount;
    public String[] postIDs;
    public String[] postData;
    public String[] UNamePosts;
    public String[] UNameComments;
    public String[] commentData;
    JSONParser JParse;
    public String name;
    public String Uid;

    JSONArray allPosts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Bundle extras = getIntent().getExtras();
        if ( extras != null) {

            name = extras.getString("name");
            Uid = extras.getString("id");
            //text.setText(str);
        }






/*
        titles = new String[]
                {
                        "This an awesome post",
                        "I know more than you, and you suck",
                        "DAE h8 reposts?",
                        "TIL, a man named George Washington was the first president of the United States",
                        "PRAISE THE SUN",
                        "kitty cat likes to sit on laptop",
                        "I know people always say this...",
                        "how to overcome social anxiety in only 345323445 steps",
                        "TIL this is a post",
                        "Need more filler",
                        "sdafnosndfosidnfosidfn",
                        "help scroll more",
                        "still testing",
                        "a b c",
                        "This is the end"
                };

         scores = new String[]
                {
                        "350",
                        "332",
                        "300",
                        "254",
                        "252",
                        "222",
                        "208",
                        "197",
                        "188",
                        "160",
                        "145",
                        "111",
                        "80",
                        "3",
                        "-100"
                };

        commentCount = new String[]
                {
                        "35",
                        "32",
                        "00",
                        "54",
                        "25",
                        "22",
                        "08",
                        "17",
                        "88",
                        "16",
                        "15",
                        "11",
                        "8",
                        "3",
                        "100"
                };

        postIDs = new String[]
                {
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                        "11",
                        "12",
                        "13",
                        "14",
                        "15"
                };
*/


        listView = (ListView) findViewById(R.id.list);

        Thread t = new Thread() {

            @Override
            public void run() {
                try {
                    while (!isInterrupted()) {
                        Thread.sleep(1000);
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                //Setup adapter
                                System.out.println("sdkufhsiudfisdfhiusdhfiu " + name + Uid);

                            }
                        });
                    }
                } catch (InterruptedException e) {
                }
            }
        };

      //  t.start();



        LaravelHandler larHan = new LaravelHandler("http://synco.xyz/api/v1/posts");
        try {
            allPosts = larHan.execute().get();// Todo This is where I stopped. successfully pulled the string, now need to convert to JSON and see if we can make arrays out of them.
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) { //this whole section is bad, but works for our needs. The execution will basically hng until data as obtained instead of running concurrently
            e.printStackTrace();
            larHan.errorMsg("Execution exception");
        }


        //System.out.print("This worked!-------------------------------------\n"+JParse.titles[1]+ "\n-------------------------------------");






        listView = (ListView) findViewById(R.id.list);

        JParse = new JSONParser(allPosts);

        JParse.parseAllPostsForAdapter();

        final ArrayList<HashMap<String, String>> postsList = new ArrayList<>();

        int[] sortByValues = new int[JParse.ids.length];

        for(int i =0; i<JParse.ids.length; i++)
        {

               sortByValues[i] = Integer.parseInt(JParse.scores[i]);
        }


        int n = sortByValues.length;
        int temp = 0;
        String tempSwap = "";

        for (int i = 0; i < n; i++) { //This bubble sort could be replaced
            for (int v = 1; v < (n - i); v++) {

                if (sortByValues[v - 1] < sortByValues[v]) {



                    temp = sortByValues[v - 1];
                    sortByValues[v - 1] = sortByValues[v];
                    sortByValues[v] = temp;


                    tempSwap = JParse.titles[v - 1];
                    JParse.titles[v - 1] = JParse.titles[v];
                    JParse.titles[v] = tempSwap;

                    tempSwap = JParse.scores[v - 1];
                    JParse.scores[v - 1] = JParse.scores[v];
                    JParse.scores[v] = tempSwap;

                    tempSwap = JParse.commentCounts[v - 1];
                    JParse.commentCounts[v - 1] = JParse.commentCounts[v];
                    JParse.commentCounts[v] = tempSwap;

                    tempSwap = JParse.ids[v - 1];
                    JParse.ids[v - 1] = JParse.ids[v];
                    JParse.ids[v] = tempSwap;

                    tempSwap = JParse.UNamePosts[v - 1];
                    JParse.UNamePosts[v - 1] = JParse.UNamePosts[v];
                    JParse.UNamePosts[v] = tempSwap;

                    tempSwap = JParse.postData[v - 1];
                    JParse.postData[v - 1] = JParse.postData[v];
                    JParse.postData[v] = tempSwap;




                }

            }
        }



        for (int i = 0; i < JParse.ids.length; i++) {

                HashMap<String, String> data = new HashMap<>();
                data.put("title", JParse.titles[i]);
                data.put("scores", JParse.scores[i]);
            data.put("commentCount", ("Comment count: " + JParse.commentCounts[i]));
            data.put("postIDs", JParse.ids[i]);

            data.put("name", JParse.UNamePosts[i]);
            data.put("postData", JParse.postData[i]);
            //  data.put("UNameComments", JParse.UNameComments[i]);
            //  data.put("commentData", JParse.commentData[i]);


            postsList.add(data);

        }

        postIDs = JParse.ids;
        listView = (ListView) findViewById(R.id.list);

        customListViewAdapter = new CustomListView(getApplicationContext(), postsList, name,Uid );
        listView.setAdapter(customListViewAdapter);

        Button button = (Button)findViewById(R.id.post);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(MainActivity.this, Main3Activity.class);

                intent.putExtra("name", name);
                intent.putExtra("id",Uid);
                startActivity(intent);


            }
        });

        Button log = (Button)findViewById(R.id.logOn);

 Button logOut= (Button) findViewById(R.id.logOut);
        log.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(MainActivity.this, Main5Activity.class);

                intent.putExtra("name", name);
                intent.putExtra("id", Uid);
                startActivity(intent);

            }
        });

        logOut.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(name != null)
                {
                    Toast.makeText(getApplicationContext(), "Logged out", Toast.LENGTH_LONG).show();
                }
                else
                {
                    Toast.makeText(getApplicationContext(), "You weren't logged in", Toast.LENGTH_LONG).show();
                }
                name = null;
                Uid = null;



            }
        });

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                        int myPosition = position;

                        //String itemClickedId = listView.getItemAtPosition(myPosition).toString();
                        String itemClickedId = listView.getItemAtPosition(myPosition).toString();


                        final String[] fIDs = postIDs;




                        Intent intent = new Intent(MainActivity.this, Main2Activity.class);

                        // Toast.makeText(getApplicationContext(), selected, Toast.LENGTH_LONG).show();
                        intent.putExtra("activityOne",fIDs[Integer.parseInt(itemClickedId)]);
                        intent.putExtra("name", name);

                        startActivity(intent);
                    }


                    });
                }

        /*ArrayAdapter<String> adapter = new ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_list_item_1, android.R.id.text1, listItems);

        listView.setAdapter(adapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                    int intPosition = position;
                    String clickedValue = listView.getItemAtPosition(intPosition).toString();

                   // Toast.makeText(getApplicationContext(), clickedValue, Toast.LENGTH_LONG).show();
                    Intent intent = new Intent(MainActivity.this, Main2Activity.class);
                    String selected =(String) parent.getItemAtPosition(position);
                   // Toast.makeText(getApplicationContext(), selected, Toast.LENGTH_LONG).show();
                    intent.putExtra("activityOne",selected );
                    startActivity(intent);
                }
        }
        );*/


        }




