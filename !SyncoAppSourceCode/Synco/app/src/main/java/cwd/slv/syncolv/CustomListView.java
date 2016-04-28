package cwd.slv.syncolv;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by Colton on 4/20/2016.
 */
public class CustomListView extends BaseAdapter
{
    private Context mContext;
    private  ArrayList<HashMap<String, String>> posts;
    private static LayoutInflater inflater = null;
    public int postID;
    TextView title ;
    TextView commentCount;
    TextView score ;
    TextView author ;
    HashMap<String, String> mPost;
    public String name;
    public String id;

    public CustomListView(Context context, ArrayList<HashMap<String, String>> data, String name1, String id1){

        name = name1;
        id = id1;
        mContext = context;
        posts = data;
        inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

    }


    @Override
    public int getCount() {
        return posts.size();
    }

    @Override
    public Object getItem(int position) {
        return position;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public boolean isEnabled(int position)
    {
        return true;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View view = convertView;

        if (convertView == null){

            view = inflater.inflate(R.layout.list_row, null);


             title = (TextView) view.findViewById(R.id.title);
             commentCount = (TextView) view.findViewById(R.id.commentCount);
             score = (TextView) view.findViewById(R.id.score);
             author = (TextView) view.findViewById(R.id.author);


            mPost = new HashMap<>();

            mPost = posts.get(position);



            /*title.setText(mPost.get("title"));
            commentCount.setText(mPost.get("commentCount"));
            score.setText(mPost.get("scores"));*/


            //Handle buttons and add onClickListeners



        }
        else
        {
         //System.out.println("Row is being recycled");
            view = convertView;
        }




        title = (TextView) view.findViewById(R.id.title);
        commentCount = (TextView) view.findViewById(R.id.commentCount);
        score = (TextView) view.findViewById(R.id.score);
        author = (TextView) view.findViewById(R.id.author);



        HashMap<String, String> mPost = new HashMap<>();

        mPost = posts.get(position);



        final String fID = mPost.get("postIDs");

        final Context fContext = mContext;
        ImageButton upVote = (ImageButton)view.findViewById(R.id.upVote);
        ImageButton downVote = (ImageButton)view.findViewById(R.id.downVote);



        upVote.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {

                if(name != null) {
                    VoteHandler up = new VoteHandler(fID, id, "1");


                    System.out.printf("post ID: %s, user id: %s, name: %s", fID, id, name);

                    up.execute();

                }
                else
                {
                    System.out.println("Log in to upvote");
                    //Toast.makeText(MainActivity, "Please log in to post", Toast.LENGTH_LONG).show();
                }



            }
        });
        downVote.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {

                if(name != null) {
                    VoteHandler down = new VoteHandler(fID, id, "-1");

                    System.out.printf("post ID: %s, user id: %s, name: %s", fID, id, name);
                    down.execute();
                }
                else
                {
                    System.out.println("Log in to downvote");

                }


            }
        });



        title.setText(mPost.get("title"));
        commentCount.setText(mPost.get("commentCount"));
        score.setText(mPost.get("scores"));
        author.setText("Created By: " + mPost.get("name"));


        return view;
    }
}
