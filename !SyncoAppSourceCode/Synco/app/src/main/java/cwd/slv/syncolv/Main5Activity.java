package cwd.slv.syncolv;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.concurrent.ExecutionException;

public class Main5Activity extends AppCompatActivity {

    public static final String PREFS_NAME = "MyPrefsFile";

    EditText email;
    EditText password;
    public String name;
    public String id;
    EditText crName;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main5);

        Bundle extras = getIntent().getExtras();
        if ( extras != null) {

            name = extras.getString("name");
            id = extras.getString("id");
            //text.setText(str);
        }

        Button button = (Button)findViewById(R.id.logOnButton);
        email = (EditText) findViewById(R.id.email) ;
        password = (EditText) findViewById(R.id.password) ;


        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String[] temp = new String[2];
                LogOnHandler log = new LogOnHandler(email.getText().toString(), password.getText().toString());
                try {
                    temp = log.execute().get();
                    name = temp[0];
                    id = temp[1];
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    System.out.println("Execution exception in main 5");
                    e.printStackTrace();
                    name = null;
                    id = null;
                }





                Intent intent = new Intent(Main5Activity.this, MainActivity.class);

                intent.putExtra("name", name);
                intent.putExtra("id",id);
                startActivity(intent);


            }
        });


        Button create = (Button)findViewById(R.id.createUser);

        crName = (EditText) findViewById(R.id.uName);

        create.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                /*Toast.makeText(getApplicationContext(), "GO AWAY. CREATE AN ACCOUNT ON THE WEBSITE YOUR CREDENTIALS WERE... \nEmail: " +email.getText().toString()
                        + "\nPassword: " +  password.getText().toString(), Toast.LENGTH_LONG).show();*/

            CreateHandler cre = new CreateHandler(email.getText().toString(),password.getText().toString(),crName.getText().toString());
                cre.execute();


               Intent intent = new Intent(Main5Activity.this, MainActivity.class);

                intent.putExtra("name",crName.getText().toString() );
                intent.putExtra("id",id);
                startActivity(intent);


            }
        });


        Button ret = (Button)findViewById(R.id.logOnReturnButton);

        ret.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(Main5Activity.this, MainActivity.class);

                intent.putExtra("name", name);
                intent.putExtra("id",id);
                startActivity(intent);


            }
        });
    }

}
