package cwd.slv.syncolv;

import android.os.AsyncTask;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


/**
 * Created by Colton on 4/21/2016. /
 * I intend to hit the url and pull and push stuff in this class
 */
public class LaravelHandler extends AsyncTask<Void,Void,JSONArray>
{

    String response;
    JSONArray allPostsJArray;
    String URLToPull;


    protected void onPreExecute() {
        //display progress dialog.

    }
    protected JSONArray doInBackground(Void... params) {// this runs when an instance of this object is .execute'd

        allPostsJArray = new JSONArray();
        allPostsJArray =  this.getAllPosts(URLToPull);

       return allPostsJArray;
    }



    protected void onPostExecute(Void result) {

    }


    LaravelHandler(String URL)
    {
        URLToPull = URL;
    }

    public JSONArray getAllPosts(String url) //this converts the string response to a JSON Array
    {

        String responseText = getResponseText(url);
        JSONArray mainResponseObject = null;
        try {
            mainResponseObject = new JSONArray(responseText);
        } catch (JSONException e) {
            errorMsg("JSON Exception");
            e.printStackTrace();
        }
        return  mainResponseObject;
    }

    public JSONArray getPost(String url) //this converts the string response to a JSON Array
    {

        String responseText = getResponseText(url);
        JSONArray mainResponseObject = null;
        try {
            mainResponseObject = new JSONArray(responseText);
        } catch (JSONException e) {
            errorMsg("JSON Exception");
            e.printStackTrace();
        }
        return  mainResponseObject;
    }



    public String getResponseText(String stringUrl)  // this gets the JSON in string form
    {
        StringBuilder response  = new StringBuilder();

        URL url = null;
        try {
            url = new URL(stringUrl);
        } catch (MalformedURLException e) {
            errorMsg("MalformedURL");
            e.printStackTrace();
        }
        HttpURLConnection httpconn = null;
        try {
            httpconn = (HttpURLConnection)url.openConnection();
        } catch (IOException e) {
            errorMsg("IO exception 1");
            e.printStackTrace();
        }
        try {

            BufferedReader input = new BufferedReader(new InputStreamReader(httpconn.getInputStream()),8192);
            String strLine = null;
            while ((strLine = input.readLine()) != null)
            {
                response.append(strLine);
            }
            input.close();
        } catch (IOException e) {
            errorMsg("IO exception 2");
            e.printStackTrace();
        }
        return response.toString();
    }

    public void errorMsg(String msg)
    {
        System.out.print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
        System.out.println(msg);
        System.out.print("\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");

    }




}


