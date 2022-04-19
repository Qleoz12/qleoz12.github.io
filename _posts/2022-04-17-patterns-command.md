---
title:  "Command pattern"
search: false
categories: 
  - Fundamentals/patterns
date: 2022-04-17
last_modified_at: 2022-04-17T08:06:00-05:00
---

This is an example for implementation for Command pattern

## concept

the command patterns encapsulates a request as an object, thereby letting you parameterize 
other objects with differet requests,queue or log requets and suport ubdoable operations.



**Note:** this is an example of Command patterns, its will be a series for implement all patterns in java / python / go
{: .notice--info}

in the next classes you can see the implementation for apply the Command pattern and how in the MainClass call all implemantationfor show usage, 
you can see the flexibility for use this structure in the problem for OOP on Pizzeria 

## abstraccions 

```java
public class RemoteControlWithUndo {
 Command[] onCommands;
 Command[] offCommands;
 Command undoCommand;

	public RemoteControlWithUndo() {
	onCommands = new Command[7];
	offCommands = new Command[7];
	Command noCommand = new NoCommand();
	for(int i=0;i<7;i++) {
	onCommands[i] = noCommand;
	offCommands[i] = noCommand;
	}
	undoCommand = noCommand;
	}

	public void setCommand(int slot, Command onCommand, Command offCommand) {
 onCommands[slot] = onCommand;
 offCommands[slot] = offCommand;
 }
 public void onButtonWasPushed(int slot) {
 onCommands[slot].execute();
 undoCommand = onCommands[slot];
 }
 public void offButtonWasPushed(int slot) {
 offCommands[slot].execute();
 undoCommand = offCommands[slot];
 }
 public void undoButtonWasPushed() {
 undoCommand.undo();
 }
 
 public String toString() {
 // toString code here...
 }

 }

```



## Usage

```java
public class Light {
	String location;
	int level;

	public Light(String location) {
		this.location = location;
	}

	public void on() {
		level = 100;
		System.out.println("Light is on");
	}

	public void off() {
		level = 0;
		System.out.println("Light is off");
	}

	public void dim(int level) {
		this.level = level;
		if (level == 0) {
			off();
		}
		else {
			System.out.println("Light is dimmed to " + level + "%");
		}
	}

	public int getLevel() {
		return level;
	}
}
```
```java
public class LightOffCommand implements Command {
	Light light;
	int level;
	public LightOffCommand(Light light) {
		this.light = light;
	}
 
	public void execute() {
        level = light.getLevel();
		light.off();
	}
 
	public void undo() {
		light.dim(level);
	}
}
```

```java
public class LightOnCommand implements Command {
	Light light;
	int level;
	public LightOnCommand(Light light) {
		this.light = light;
	}
 
	public void execute() {
        level = light.getLevel();
		light.on();
	}
 
	public void undo() {
		light.dim(level);
	}
}
```



```java
public class MainClass {
    public static void main(String[] args) {
		
		RemoteControlWithUndo remoteControl = new RemoteControlWithUndo();
		Light livingRoomLight = new Light("Living Room");
		LightOnCommand livingRoomLightOn =  new LightOnCommand(livingRoomLight);
		LightOffCommand livingRoomLightOff = new LightOffCommand(livingRoomLight);
		remoteControl.setCommand(0, livingRoomLightOn, livingRoomLightOff);
		remoteControl.onButtonWasPushed(0);
		remoteControl.offButtonWasPushed(0);
		System.out.println(remoteControl);
		remoteControl.undoButtonWasPushed();
		remoteControl.offButtonWasPushed(0);
		remoteControl.onButtonWasPushed(0);
		System.out.println(remoteControl);
		remoteControl.undoButtonWasPushed();

	}
}
```
