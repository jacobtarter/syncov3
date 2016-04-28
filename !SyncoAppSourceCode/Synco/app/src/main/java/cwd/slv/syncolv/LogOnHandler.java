package cwd.slv.syncolv;

import android.content.SharedPreferences;
import android.os.AsyncTask;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

/**
 * Created by Colton on 4/27/2016.
 */
public class LogOnHandler extends AsyncTask<Void,Void,String[]>
{
    private static final String USER_AGENT = "Mozilla/5.0";


    private static final String POST_URL = "http://synco.xyz/auth";

    private String POST_PARAMS_UERNAME;

    private String POST_PARAMS_PASSWORD;

    public String name;
    public String id;

    public String[] nid;


    private String POST_PARAMS;


    @Override
    protected String[] doInBackground(Void... params) {


        sendPOST();
        System.out.println("POST DONE");

        return nid;
    }



    LogOnHandler(String email, String pass)
    {
        POST_PARAMS_UERNAME = "email=" +email;
        POST_PARAMS_PASSWORD = "password=" + pass;
        POST_PARAMS = POST_PARAMS_UERNAME + "&" + POST_PARAMS_PASSWORD;
        System.out.println("sdkhfsiduhsifuh    "+ POST_PARAMS);
    }

    private void sendPOST()
    {
        URL obj = null;
        try {
            obj = new URL(POST_URL);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            System.out.println("Malformed URL in post handler");
        }
        HttpURLConnection con = null;
        try {
            con = (HttpURLConnection) obj.openConnection();
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("IOException in posthandler");
        }
        try {
            con.setRequestMethod("POST");
        } catch (ProtocolException e) {
            System.out.println("Protocol Exception in posthandler");
            e.printStackTrace();
        }
        con.setRequestProperty("User-Agent", USER_AGENT);

        // For POST only - START
        con.setDoOutput(true);
        OutputStream os = null;
        try {
            os = con.getOutputStream();
        } catch (IOException e) {
            System.out.println("IOException in posthandler 2");
            e.printStackTrace();
        }
        try {
            os.write(POST_PARAMS.getBytes());
        } catch (IOException e) {
            System.out.println("IOException in posthandler 3");
            e.printStackTrace();
        }
        try {
            os.flush();
        } catch (IOException e) {
            System.out.println("IOException in posthandler 4");
            e.printStackTrace();
        }
        try {
            os.close();
        } catch (IOException e) {
            System.out.println("IOException in posthandler 5");

            e.printStackTrace();
        }
        // For POST only - END

        int responseCode = 0;
        try {
            responseCode = con.getResponseCode();
        } catch (IOException e) {
            System.out.println("IOException in posthandler 6");
            e.printStackTrace();
        }
        System.out.println("POST Response Code :: " + responseCode);

        if (responseCode == 201) { //success
            BufferedReader in = null;
            try {
                in = new BufferedReader(new InputStreamReader(
                        con.getInputStream()));
            } catch (IOException e) {
                System.out.println("IOException in posthandler 7");
                e.printStackTrace();
            }
            String inputLine;
            StringBuffer response = new StringBuffer();

            try {
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
            } catch (IOException e) {System.out.println("IOException in posthandler 8");
                e.printStackTrace();
            }
            try {
                in.close();
            } catch (IOException e) {
                System.out.println("IOException in posthandler 9");
                e.printStackTrace();
            }

            // print result
            System.out.println(response.toString());

            JSONObject user = null;
            try {
                user = new JSONObject(response.toString());
            } catch (JSONException e) {
                System.out.println("JSONException in log on");
                e.printStackTrace();

            }

            try {
                name = user.getString("name");
            } catch (JSONException e) {
                System.out.println("JSONException in log on 2");
                e.printStackTrace();
            }


            try {
                id = user.getString("id");
            } catch (JSONException e) {
                System.out.println("JSONException in log on 3");
                e.printStackTrace();
            }

            nid= new String[2];
            nid[0] = name;
            nid[1] = id;
            System.out.println(name + id);



        } else {
            System.out.println("POST request not worked");
        }
    }


}
