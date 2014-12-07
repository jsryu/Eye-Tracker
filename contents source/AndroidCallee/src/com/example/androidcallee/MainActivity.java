/**
 *	Project: Blick
 *	Content: Eye-alarm(Callee)
 *	Date: 07/12/2004
 *	Author: Seung-wook KIM
 */

package com.example.androidcallee;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.Typeface;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class MainActivity extends Activity implements Runnable
{
	public static final int serverPort = 2014;
	

	MediaPlayer mediaPlayer;

	ServerSocket serverSocket = null;
	Socket socket = null;
	Thread serverThread = null;

	TextView tv;
	RelativeLayout rl;


	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		
		tv = (TextView) findViewById(R.id.text_main);
		Typeface tf = Typeface.createFromAsset(this.getAssets(),
	            "fonts/font.ttf");
	    tv.setTypeface(tf);
	    
		rl = (RelativeLayout) findViewById(R.id.layout_main);
		
		rl.setBackgroundColor(Color.rgb(0, 255, 0));
		tv.setText("대기...");
		tv.setTextColor(Color.rgb(0, 0, 0));
		rl.setOnClickListener(new OnClickListener()
			{

				@Override
				public void onClick(View v)
				{
					if(socket != null && !socket.isClosed())
					{
						try
						{
							socket.close();
						}
						catch(IOException e) { e.printStackTrace(); }
					}
					rl.setBackgroundColor(Color.rgb(0, 255, 0));
					tv.setText("대기...");
					tv.setTextColor(Color.rgb(0, 0, 0));
					socket = null;
					killMediaPlayer();

				}
			});


		serverThread = new Thread(this);
		serverThread.start();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu)
	{
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}


	public void run()
	{
		try
		{
			serverSocket = new ServerSocket(serverPort);
		}
		catch(IOException e) { e.printStackTrace(); }
		
		while(!Thread.currentThread().isInterrupted())
		{
			try
			{
				socket = serverSocket.accept();
				System.out.println("Connection established");
				playAudio();
				socket.close();
				socket = null;
			}
			catch(Exception e) { e.printStackTrace(); }
		}
		System.out.println("Thread down");
	}

	@Override
	protected void onDestroy()
	{
		super.onDestroy();
		try
		{
			if(serverSocket != null)
				serverSocket.close();
			serverSocket = null;
			
			if(serverThread != null)
				serverThread.interrupt();
			serverThread = null;
			
			if(socket != null && !socket.isClosed())
				socket.close();
			socket = null;
		}
		catch(IOException e) { e.printStackTrace(); }
		killMediaPlayer();
	}

	private void playAudio() throws Exception
	{
		killMediaPlayer();
		/*
		File extSt = Environment.getExternalStorageDirectory();
		String Path = extSt.getAbsolutePath() + url;
		 */
		runOnUiThread(new Runnable()
		{
            @Override
             public void run()
            {
        		rl.setBackgroundColor(Color.rgb(255, 0, 0));
        		tv.setText("도움!");
				tv.setTextColor(Color.rgb(255, 255, 255));
             }
        });
		
		/*
		mediaPlayer = new MediaPlayer();
		mediaPlayer.setDataSource(Path);
		mediaPlayer.prepare();
		*/
		mediaPlayer = MediaPlayer.create(this, R.raw.mp3);
		mediaPlayer.start();
	}

	private void killMediaPlayer()
	{
		if(mediaPlayer != null)
		{
			try
			{
				mediaPlayer.release();
			}
			catch(Exception e) { e.printStackTrace(); }
		}
		mediaPlayer = null;
	}
	

}
