package cwd.slv.syncolv;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.concurrent.ExecutionException;

/**
 * Created by Colton on 4/21/2016.
 */
public class JSONParser
{
    public JSONArray JArrIn;
    //public ArrayList<String>[] fullPostsArray;
    //JSONArray allAbouts;
    //public String[]
    public String[] scores;
    public String[] commentCounts;
    public String[] titles;
    public String[] ids;
    public String[] postData;
    public String[] UNamePosts;
    public String[] UNameComments;
    public String[] commentData;
    public int cCount;


    JSONParser(JSONArray arrayToParse)
    {
        JArrIn = arrayToParse;
    }

    void parsePost(String pID)
    {
        UNamePosts = new String[JArrIn.length()];
        postData = new String[JArrIn.length()];
        scores = new String[JArrIn.length()];
        titles = new String[JArrIn.length()];

        JSONObject EachPostJSON = null;
        try {
            EachPostJSON = JArrIn.getJSONObject(0);
        } catch (JSONException e) {
            System.out.println("JSON Exception in parser 1A");
            e.printStackTrace();
        }


        try {
            scores[0] = EachPostJSON.getString("vote_score");
        } catch (JSONException e) {
            System.out.println("JSON Exception in parser 3A");
            e.printStackTrace();
        }
        try {
            UNamePosts[0] = EachPostJSON.getString("name");
        } catch (JSONException e) {System.out.println("JSON Exception in parser 4A");
            e.printStackTrace();
        }
        try {
            postData[0] = EachPostJSON.getString("ptext");
        } catch (JSONException e) {System.out.println("JSON Exception in parser 4A");
            e.printStackTrace();
        }
        try {
            titles[0] = EachPostJSON.getString("title");
        } catch (JSONException e) {System.out.println("JSON Exception in parser 4B");
            e.printStackTrace();
        }

        JSONArray singlePost = null;

        LaravelHandler laHan = new LaravelHandler("http://synco.xyz/api/v1/comments/" + pID);
        try {
            singlePost = laHan.execute().get();// Todo This is where I stopped. successfully pulled the string, now need to convert to JSON and see if we can make arrays out of them.
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) { //this whole section is bad, but works for our needs. The execution will basically hng until data as obtained instead of running concurrently
            e.printStackTrace();
            laHan.errorMsg("Execution exception in Main2");
        }




        cCount = 0;

        try {

            cCount = Integer.parseInt(EachPostJSON.getString("comment_count"));
        } catch (JSONException e) {System.out.println("JSON Exception in parser 5A");
            e.printStackTrace();
        }




        UNameComments = new String[cCount];
        commentData = new String[cCount];






        if(cCount != 0)
        {
            JSONArray commentArray = null;

                commentArray = singlePost;

            for (int i = 0; i < cCount ; i++)
            {
                JSONObject EachCommentJSON = null;
                try {
                    EachCommentJSON = commentArray.getJSONObject(i);
                } catch (JSONException e) {
                    System.out.println("JSON Exception in parser 1BAAAAAA");
                    e.printStackTrace();
                }




                try {
                    commentData[i] = EachCommentJSON.getString("ctext");

                } catch (JSONException e) {
                    System.out.println("JSON Exception in parser 7AA");
                    e.printStackTrace();
                }
               // System.out.print("This worked!-------------------------------------\n"+commentData[i]+ "\n-------------------------------------");

                try {
                    UNameComments[i] = EachCommentJSON.getString("name");
                } catch (JSONException e) {
                    System.out.println("JSON Exception in parser 8AA");
                    e.printStackTrace();
                }
             //   System.out.print("This worked!-------------------------------------\n"+UNameComments[i]+ "\n-------------------------------------");
            }


        }
        else
        {
            UNameComments = new String[1];
            commentData = new String[1];
            UNameComments[0] = "No Comments yet!";
        }

    }


    void parseAllPostsForAdapter()
    {
        ids = new String[JArrIn.length()];
        titles = new String[JArrIn.length()];
        scores = new String[JArrIn.length()];
        commentCounts = new String[JArrIn.length()];
        postData = new String[JArrIn.length()];
        UNamePosts = new String[JArrIn.length()];


        JSONObject EachPostJSON = null;
        for (int i = 0; i < JArrIn.length(); i++) {
            try {
                EachPostJSON = JArrIn.getJSONObject(i);
            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 1");
                e.printStackTrace();
            }



            try {
                ids[i] = EachPostJSON.getString("id");
            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 3");
                e.printStackTrace();
            }
            try {
                commentCounts[i] = EachPostJSON.getString("comment_count");
            } catch (JSONException e) {System.out.println("JSON Exception in parser 4");
                e.printStackTrace();
            }
            try {
                scores[i] =  EachPostJSON.getString("vote_score");
            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 5");
                e.printStackTrace();
            }
            try {
                titles[i] =  EachPostJSON.getString("title");
            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 6");
                e.printStackTrace();
            }
            try {
                postData[i] =  EachPostJSON.getString("ptext");
            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 7");
                e.printStackTrace();
            }

            try {
                UNamePosts[i] =  EachPostJSON.getString("name");
            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 8");
                e.printStackTrace();
            }


          /*  tempToPopulateArrays = null;
            try {
                tempToPopulateArrays = new JSONObject(EachPostJSON.getString("comments"));

            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 9");
                e.printStackTrace();
            }

            try {
                commentData[i] = tempToPopulateArrays.getString("ctext");
            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 10");
                e.printStackTrace();
            }

            try {
                UNameComments[i] = tempToPopulateArrays.getString("name");
            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 11");
                e.printStackTrace();
            }*/


        }

    }
}





        /* More dumb. It's getting late. I was trying to parse a JSON Array ([) like a JSON object ({)
        allAbouts= null;
        try {
            allAbouts = (JSONArray) JArrIn.get("about");
        } catch (JSONException e) {
            System.out.println("JSON Exception in parser");
            e.printStackTrace();
        }
        // tak the elements of the json array
        for(int i=0; i<allAbouts.length(); i++){
            try {
                System.out.println("The " + i + " element of the array: "+allAbouts.get(i));
            } catch (JSONException e) {
                System.out.println("JSON Exception in parser 2");
                e.printStackTrace();
            }
        }

        try {
            System.out.println(allAbouts.get(1));
        } catch (JSONException e) {
            System.out.println("JSON Exception in parser 3");
            e.printStackTrace();
        }


    }
/*

/* I'm dumb... started making custom parser... idiot
    ArrayList<String>[] parseFullPosts(JSONArray JArrIn)
    {
        fullPostsArray = (ArrayList<String>[])new ArrayList[JArrIn.length()];

        if (JArrIn != null) {
            for (int i=0;i<JArrIn.length();i++){
                try {
                    System.out.println(i + ": " +JArrIn.get(i).toString());
                    fullPostsArray[i] = new ArrayList<String>();
                    fullPostsArray[i].add(JArrIn.get(i).toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
        return fullPostsArray;
    }*/



