package cwd.slv.syncolv;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class Main4Activity extends Activity {

    EditText cName ;
    EditText cPost ;
    private String pID;
    public String name;
    public String id;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main4);

        Bundle extras = getIntent().getExtras();

        if ( extras != null)
        {
            pID = extras.getString("activityOne");


                name = extras.getString("name");
                id = extras.getString("id");

            //text.setText(str);
        }



        cPost = (EditText) findViewById(R.id.commentPost);

        Button csubmit = (Button)findViewById(R.id.commentSubmit);
        csubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {



                if(name != null)
                {
                    CommentHandler commentIt;

                    commentIt = new CommentHandler(name, cPost.getText().toString(),pID);
                    commentIt.execute();

                    Intent intent = new Intent(Main4Activity.this, Main2Activity.class);
                    intent.putExtra("activityOne",pID);
                    intent.putExtra("name", name);
                    intent.putExtra("id",id);

                    startActivity(intent);

                }
                else
                {
                    Toast.makeText(getApplicationContext(), "Please log in to post a comment", Toast.LENGTH_LONG).show();
                }






            }
        });


        Button cReturn = (Button)findViewById(R.id.commentReturn);
        cReturn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(Main4Activity.this, Main2Activity.class);
                intent.putExtra("activityOne",pID);
                intent.putExtra("name", name);
                intent.putExtra("id",id);

                startActivity(intent);


            }
        });


    }

}
