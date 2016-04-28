package cwd.slv.syncolv;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class Main3Activity extends Activity {

    public static final String PREFS_NAME = "MyPrefsFile";

    EditText title ;
    public String id;
    public String name;

    EditText post ;
    PostHandler postIT;
    public String daID;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main3);

        Bundle extras = getIntent().getExtras();

        if ( extras != null) {

            name = extras.getString("name");
            id = extras.getString("id");
            daID = extras.getString("activityOne");
            //text.setText(str);
        }

        System.out.println("sdfusdiufsidhfsdihfifhsidufh    "+ daID);

        Button button = (Button)findViewById(R.id.retButton);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(Main3Activity.this, MainActivity.class);

                intent.putExtra("name", name);
                intent.putExtra("id",id);
                startActivity(intent);
            }
        });

         title = (EditText)findViewById(R.id.titleInput);
         //name = (EditText)findViewById(R.id.nameInput);
         post = (EditText)findViewById(R.id.postInput);






        Button submit = (Button)findViewById(R.id.submit);
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                System.out.println("sodfosdijfsdijf " + name);

                if(name != null)
                {
                    if(daID!=null)
                    {
                        System.out.println(daID);
                     EditHandler edit = new EditHandler(title.getText().toString(),name,post.getText().toString(),daID);
                        edit.execute();
                        Intent intent = new Intent(Main3Activity.this, MainActivity.class);

                        intent.putExtra("name", name);
                        intent.putExtra("id", id);
                        startActivity(intent);
                    }
                    else
                    {
                        postIT = new PostHandler(title.getText().toString(), name, post.getText().toString());
                        postIT.execute();
                        Intent intent = new Intent(Main3Activity.this, MainActivity.class);

                        intent.putExtra("name", name);
                        intent.putExtra("id", id);
                        startActivity(intent);


                    }

                }
                else
                {
                    Toast.makeText(getApplicationContext(), "Please log in to post", Toast.LENGTH_LONG).show();
                }




            }
        });
    }

}
