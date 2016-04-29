package cwd.slv.syncolv;

import android.os.AsyncTask;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

/**
 * Created by Colton on 4/29/2016.
 */
public class CreateHandler extends AsyncTask<Void,Void,Void>
{
    private static final String USER_AGENT = "Mozilla/5.0";


    private static final String POST_URL = "http://synco.xyz/authentication/register";

    private String POST_PARAMS_TITLE;

    private String POST_PARAMS_NAME;

    private String POST_PARAMS_POST;

    private String POST_PARAMS;


    @Override
    protected Void doInBackground(Void... params) {
        sendPOST();
        System.out.println("POST DONE");
        return null;
    }

    CreateHandler(String email, String password, String name)
    {
        POST_PARAMS_POST = "email=" +email;
        POST_PARAMS_NAME = "password=" + password;
        POST_PARAMS_TITLE = "name="+ name;
        POST_PARAMS = POST_PARAMS_NAME + "&" + POST_PARAMS_TITLE + "&" + POST_PARAMS_POST;
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

        if (responseCode == HttpURLConnection.HTTP_OK) { //success
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
        } else {
            System.out.println("POST request not worked");
        }
    }


}