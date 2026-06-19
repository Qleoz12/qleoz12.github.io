---
title:  "Proxy Pattern"
search: false
categories: 
  - Fundamentals/patterns
date: 2022-04-20
last_modified_at: 2022-04-20T08:06:00-05:00
---

This is an example for implementation for Proxy pattern

## Concept

The Proxy Pattern provides a surrogate or placeholder for
another object to control access to it.

The pattern illustrates how a proxy class can interact with another and, internally,
it connects to the real service or implementation class that provides the functionality.

![alt]({{ site.url }}{{ site.baseurl }}/assets/images/pattern_proxy.png)

the software talks with proxy class, proxy class connects with the service over network

### java
Java exposes a technology called RMI (Remote Method Invocation), it allows connect the proxy client class
with the real service class throught net, its permits make remote calls from the local class to remote class
keeping in mind the estrcture you must to folow

**Note:** this is an example of Proxy patterns, its will be a series for implement all patterns in java / python / go
{: .notice--info}

in the next classes you can see the implementation for apply the Proxy pattern and how in the MainClass call all implemantationfor show usage, 
you can see the flexibility for use this structure in the problem for OOP

## abstraccions 

```java
import java.net.*;
import java.awt.*;
import javax.swing.*;

class ImageProxy implements Icon {
	volatile ImageIcon imageIcon;
	final URL imageURL;
	Thread retrievalThread;
	boolean retrieving = false;
     
	public ImageProxy(URL url) { imageURL = url; }
     
	public int getIconWidth() {
		if (imageIcon != null) {
            return imageIcon.getIconWidth();
        } else {
			return 800;
		}
	}
 
	public int getIconHeight() {
		if (imageIcon != null) {
            return imageIcon.getIconHeight();
        } else {
			return 600;
		}
	}
	
	synchronized void setImageIcon(ImageIcon imageIcon) {
		this.imageIcon = imageIcon;
	}
     
	public void paintIcon(final Component c, Graphics  g, int x,  int y) {
		if (imageIcon != null) {
			imageIcon.paintIcon(c, g, x, y);
		} else {
			g.drawString("Loading album cover, please wait...", x+300, y+190);
			if (!retrieving) {
				retrieving = true;
				
				retrievalThread = new Thread(new Runnable() {
					public void run() {
						try {
							setImageIcon(new ImageIcon(imageURL, "Album Cover"));
							c.repaint();
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				});
				
				retrievalThread = new Thread(() -> {
						try {
							setImageIcon(new ImageIcon(imageURL, "Album Cover"));
							c.repaint();
						} catch (Exception e) {
							e.printStackTrace();
						}
				});
				retrievalThread.start();
				
			}
		}
	}
}

```



## Usage

```java
class ImageComponent extends JComponent {
	private static final long serialVersionUID = 1L;
	private Icon icon;

	public ImageComponent(Icon icon) {
		this.icon = icon;
	}

	public void setIcon(Icon icon) {
		this.icon = icon;
	}

	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		int w = icon.getIconWidth();
		int h = icon.getIconHeight();
		int x = (800 - w)/2;
		int y = (600 - h)/2;
		icon.paintIcon(this, g, x, y);
	}
}
```

```java
public class MainClass {

	ImageComponent imageComponent;
	JFrame frame = new JFrame("Album Cover Viewer");
	JMenuBar menuBar;
	JMenu menu;
	Hashtable<String, String> albums = new Hashtable<String, String>();

	public static void main (String[] args) throws Exception {
		ImageProxyTestDrive testDrive = new ImageProxyTestDrive();
	}

	public ImageProxyTestDrive() throws Exception {
		albums.put("Buddha Bar","http://images.amazon.com/images/P/B00009XBYK.01.LZZZZZZZ.jpg");
		albums.put("Ima","http://images.amazon.com/images/P/B000005IRM.01.LZZZZZZZ.jpg");
		albums.put("Karma","http://images.amazon.com/images/P/B000005DCB.01.LZZZZZZZ.gif");
		albums.put("MCMXC a.D.","http://images.amazon.com/images/P/B000002URV.01.LZZZZZZZ.jpg");
		albums.put("Northern Exposure","http://images.amazon.com/images/P/B000003SFN.01.LZZZZZZZ.jpg");
		albums.put("Selected Ambient Works, Vol. 2","http://images.amazon.com/images/P/B000002MNZ.01.LZZZZZZZ.jpg");

		URL initialURL = new URL((String)albums.get("Selected Ambient Works, Vol. 2"));
		menuBar = new JMenuBar();
		menu = new JMenu("Favorite Albums");
		menuBar.add(menu);
		frame.setJMenuBar(menuBar);

		for (Enumeration<String> e = albums.keys(); e.hasMoreElements();) {
			String name = (String)e.nextElement();
			JMenuItem menuItem = new JMenuItem(name);
			menu.add(menuItem); 
			menuItem.addActionListener(event -> {
				imageComponent.setIcon(new ImageProxy(getAlbumUrl(event.getActionCommand())));
				frame.repaint();
			});
		}

		// set up frame and menus

		Icon icon = new ImageProxy(initialURL);
		imageComponent = new ImageComponent(icon);
		frame.getContentPane().add(imageComponent);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(800,600);
		frame.setVisible(true);

	}

	URL getAlbumUrl(String name) {
		try {
			return new URL((String)albums.get(name));
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return null;
		}
	}
}
```
