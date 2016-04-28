package cwd.slv.syncolv;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;

import java.util.concurrent.ExecutionException;

public class Main2Activity extends Activity {
    public static final String PREFS_NAME = "MyPrefsFile";
    private ListView comments;
    public TextView score;
    JSONArray singlePost;
    private TextView title;
    private TextView author;
    private TextView post;
    private String pID;

    public String name;
    public String id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        // text = (TextView)findViewById(R.id.text0);
        Bundle extras = getIntent().getExtras();

        if ( extras != null)
        {

            pID = extras.getString("activityOne");
            name = extras.getString("name");
            id = extras.getString("id");

            //text.setText(str);
        }

        LaravelHandler laHan = new LaravelHandler("http://synco.xyz/api/v1/posts/" + pID);
        try {
            singlePost = laHan.execute().get();// 
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) { //this whole section is bad, but works for our needs. The execution will basically hng until data as obtained instead of running concurrently
            e.printStackTrace();
            laHan.errorMsg("Execution exception in Main2");
        }

        final JSONParser JPar = new JSONParser(singlePost);

        JPar.parsePost(pID);
        //System.out.print("This worked!-------------------------------------\n"+JParse.titles[1]+ "\n-------------------------------------");






        comments = (ListView) findViewById(R.id.commentList);

        title = (TextView) findViewById(R.id.postTitle);
        score = (TextView) findViewById(R.id.postScore);
        author = (TextView) findViewById(R.id.postAuthor);
        post = (TextView) findViewById(R.id.postBody);

        title.setText("Title: " + JPar.titles[0]);
        score.setText("Score: " + JPar.scores[0]);
        author.setText("Created by: " + JPar.UNamePosts[0]);
        post.setText("Post: " +JPar.postData[0]);

        String[] commentArray = new String[JPar.cCount];
        if(JPar.cCount != 0)
        {
            for(int i = 0; i < JPar.cCount; i++)
            {

                commentArray[i] = JPar.UNameComments[i] + ": " + JPar.commentData[i];
            }

        }
        else
        {

            commentArray = new String[1];
            commentArray[0] = "There are no comments yet!";
        }

        ArrayAdapter adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, commentArray);

        comments.setAdapter(adapter);


        Button button = (Button)findViewById(R.id.ret);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(Main2Activity.this, MainActivity.class);
                intent.putExtra("activityOne",pID);
                intent.putExtra("name", name);
                intent.putExtra("id",id);
                startActivity(intent);
            }
        });

        Button comment = (Button)findViewById(R.id.postComment);

        comment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(Main2Activity.this, Main4Activity.class);
                intent.putExtra("activityOne",pID);
                intent.putExtra("name", name);
                intent.putExtra("id",id);
                startActivity(intent);
               
            }
        });


        Button edit = (Button)findViewById(R.id.edit);
        final String daTitle = JPar.titles[0];
        edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {



                Intent intent = new Intent(Main2Activity.this, Main3Activity.class);

                intent.putExtra("activityOne",pID);
                intent.putExtra("name", name);
                intent.putExtra("id",id);
                startActivity(intent);

            }
        });


        Button delete = (Button)findViewById(R.id.delete);

        delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(name != null)
                {
                    DeleteHandler del = new DeleteHandler(name, pID);
                    del.execute();
                    Intent intent = new Intent(Main2Activity.this, MainActivity.class);
                    intent.putExtra("activityOne",pID);
                    intent.putExtra("name", name);
                    intent.putExtra("id",id);
                    startActivity(intent);
                }
                else
                {
                    Toast.makeText(getApplicationContext(), "Please log in to delete", Toast.LENGTH_LONG).show();
                }

            }
        });






    }

}
