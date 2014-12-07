
import java.awt.Canvas;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.MediaTracker;
import java.awt.Point;
import java.awt.Toolkit;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import java.io.File;




@SuppressWarnings("serial")
public class GameCanvas extends Canvas implements MouseMotionListener
{
	private GameFrame gFrame;
	//graphic
	private Graphics2D g;		//��¿� �׷���
	private Image imgBuf;		//���۸��� �̹���
	
	protected int fps = 0;
	private long curTime = System.currentTimeMillis();
	private long lastTime = curTime;
	private long totalTime = 0;;
	private int frames = 0;
	
	private double R=0xFF, G=0xFA, B=0xCD;
	
	private Image mouseIcon;
	private Image target;
	
	private Font font = null;
	
	public GameCanvas(GameFrame gFrame)
	{
		this.gFrame = gFrame;
		
		target = makeImage("hm.png");
		// ���콺 Ŀ�� �̹���
		Toolkit toolkit = Toolkit.getDefaultToolkit();  
		mouseIcon = toolkit.getImage("pointer_1.png");
		Point hotSpot = new Point(0,0);
		Cursor cursor = toolkit.createCustomCursor(mouseIcon, hotSpot, "Pointer");
		setCursor(cursor); 

		try
		{
			Font ffont = Font.createFont(Font.TRUETYPE_FONT, new File("font.ttf"));
			font = ffont.deriveFont(32f);
		}
		catch(Exception e) { font = new Font("���� ���", Font.PLAIN, 32); }
		
		addMouseMotionListener(this);
	}

	public void update(Graphics g)
	{//��ũ�� ȭ���� ������Ʈ. repaint()�� ȣ���ϸ� ����ȴ�
		paint(g);
	}
	
	public synchronized void paint(Graphics gg)
	{
		//������۸�
		if(g == null)
			g = (Graphics2D)gg;
		imgBuf = createImage(this.getWidth(), this.getHeight());
		g = (Graphics2D)imgBuf.getGraphics();


		g.setFont(font); 
		
		paintBackGround(g);
		if(gFrame.start)
		{
			paintRect(g);
	//		paintFPS(g);
			paintScore(g);
		}
		else
		{
			paintMenu(g);
		}
		
		//�ٸ� ���ۿ� ����ִ� �̹����� ����Ѵ�.
		gg.drawImage(imgBuf, 0, 0, this);
		repaint(15);
	}

	public synchronized void paintBackGround(Graphics2D g)
	{
		g.setColor(new Color((int)R,(int)G,(int)B));
		
		g.fillRect(0, 0, GameFrame.frameWidth, GameFrame.frameHeight);
	
	}
	
	public synchronized void paintRect(Graphics2D g)
	{
		g.drawImage(target, gFrame.targetX, gFrame.targetY, 
				gFrame.targetR, gFrame.targetR, this);
		/*

		g.setColor(new Color(255-(int)R,255-(int)G,255-(int)B));
		g.fillRect(gFrame.targetX, gFrame.targetY, 
				gFrame.targetR, gFrame.targetR);
		*/
	}

	public synchronized void paintFPS(Graphics2D g)
	{
		//fps
		calcFPS();
		g.setColor(Color.BLACK);
		g.drawString("FPS: " + fps,	10, 30);
	}

	public synchronized void paintScore(Graphics2D g)
	{
		//fps
		g.setColor(Color.BLACK);
		g.drawString("Score: " + gFrame.score, 10, 62);
	}

	public synchronized void paintMenu(Graphics2D g)
	{
		g.setColor(Color.BLACK);
		g.drawString("Click to Start!!!", GameFrame.frameWidth/2-150, GameFrame.frameHeight/2-10);
	}
	
	
	public void calcFPS()
	{
		//fps ���
		lastTime = curTime;
		curTime = System.currentTimeMillis();
		totalTime += curTime - lastTime;
		if (totalTime > 1000)
		{
			totalTime -= 1000;
			fps = frames;
			frames = 0;
		}
		++frames;
	}
	
	public Image makeImage(String path)
	{
		Image img;
		Toolkit tk=Toolkit.getDefaultToolkit();
		img=tk.getImage(path);
		try
		{
			//�������
			MediaTracker mt = new MediaTracker(this);
			mt.addImage(img, 0);
			mt.waitForID(0);
			//�������, getImage�� �о���� �̹����� �ε��� �Ϸ�ƴ��� Ȯ���ϴ� �κ�
		}
		catch (Exception e){ return null; }	
		return img;
	}
	
	public void mouseMoved(MouseEvent me)
	{
		gFrame.mX = (int) me.getPoint().getX();
		gFrame.mY = (int) me.getPoint().getY();

		gFrame.clear();
	}

	public void mouseDragged(MouseEvent me)
	{
		mouseMoved(me);
	}

}
