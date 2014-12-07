
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JFrame;



@SuppressWarnings("serial")
public class GameFrame extends JFrame implements MouseListener
{
	public static final int frameWidth = 960;
	public static final int frameHeight = 600;
	
	protected int mX, mY;	// 마우스 좌표
	protected int score = 0, stage = 0;
	protected int targetX, targetY, targetR;

	private long timer;
	protected boolean start = false;
	private GameCanvas gCanvas;

	public GameFrame()
	{
		super();
		
		//타이틀
		setTitle("마우스게임1");
		setSize(frameWidth, frameHeight);
		//윈도우 X키 누르면 닫힘
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setResizable(false);

		gCanvas = new GameCanvas(this);
		gCanvas.setSize(frameWidth,frameHeight);
		add(gCanvas);
		
		timer = System.currentTimeMillis();
		gCanvas.addMouseListener(this);
		setVisible(true);
		
		clear();
	}

	protected void clear()
	{
		if(targetX <= mX && mX <= targetX+targetR &&
				targetY <= mY && mY <= targetY+targetR)
		{
			long t = System.currentTimeMillis();
			score += (stage++)*10000/(t - timer);
			timer = t;
			
			targetR = (int) (50*Math.random()+100);
			targetX = (int) ((frameWidth-2*targetR)*Math.random()+targetR);
			targetY = (int) ((frameHeight-2*targetR)*Math.random()+targetR);

		}
		
	}
	
	@Override
	public void mouseClicked(MouseEvent e)
	{
	}

	@Override
	public void mousePressed(MouseEvent e)
	{
	}

	@Override
	public void mouseReleased(MouseEvent e)
	{
		start = true;
	}

	@Override
	public void mouseEntered(MouseEvent e)
	{
	}

	@Override
	public void mouseExited(MouseEvent e)
	{
	}
}
