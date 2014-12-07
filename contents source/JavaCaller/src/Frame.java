
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener; // 이벤트에 관한 클래스들을 가지고 온다
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;

import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

@SuppressWarnings("serial")
public class Frame extends JFrame implements MouseListener
{
	String serverIp = "203.226.214.158";
	public static final int serverPort = 2014;
	public static final int frameWidth = 300;
	public static final int frameHeight = 300;

	JTextArea ta = new JTextArea();
	JScrollPane scrollPane = new JScrollPane(ta);
	JTextField tf = new JTextField();
	
	Socket sock;
	InetSocketAddress inetSock;
	
	public Frame()
	{
		super();
		init();
	}
	
	public void init()
	{
		sock = null;
		//타이틀
		setTitle("호출");
		setSize(frameWidth, frameHeight);
		//윈도우 X키 누르면 닫힘
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setResizable(false);

		ta.setEditable(false);
		
		scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS ); 
		add(scrollPane, BorderLayout.CENTER);
		
		
		tf.setBackground(new Color(0xFF, 0xFA, 0xBB));
		add(tf, BorderLayout.SOUTH);

		tf.setText("192.168.42.129");
		serverIp = tf.getText();
		
		
		setVisible(true);
		ta.addMouseListener(this);
	}
/*
	public void paint(Graphics g)
	{
		if(x != -1)
		{
			g.drawLine(x - 10, y, x + 10, y);
			g.drawLine(x, y - 10, x, y + 10);
		}
	}
*/
	public void mouseEntered(MouseEvent me)
	{
	}

	public void mouseExited(MouseEvent me)
	{
	}

	public void mouseClicked(MouseEvent me)
	{
		serverIp = tf.getText();
		ta.append("연결시도\n");
		
		try
		{
			InetSocketAddress socketAddress = new InetSocketAddress(serverIp, serverPort);	
			sock = new Socket();
			sock.connect(socketAddress, 3000);
			ta.append("연결성공\n");
		}
		catch(IOException e)
		{
			if(e.getMessage().equals("Connection refused: connect"))
			{
				System.out.println("Server is off !!");
				sock = null;
			}
			ta.append("연결실패\n");
		}
		
	}

	public void mousePressed(MouseEvent me)
	{
	}

	public void mouseReleased(MouseEvent me)
	{

		if(sock != null)
		{
			ta.append("연결종료\n");
			try
			{
				sock.close();
			}
			catch(IOException e)
			{
				e.printStackTrace();
			}
			sock = null;
		}
	}
}