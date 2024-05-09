---
draft: false
title: Minimum Viable Obsidian Plugin
subtitle: 
date: 2024-05-08 15:56:19
slug: minimum-viable-obsidian-plugin
description: I made a simple Obsidian plugin called Draft Indicator. You, too, can make Obsidian plugins without fiddling with TypeScript.
tags:
  - Obsidian
  - JavaScript
  - programming
---
I made an [Obsidian](https://obsidian.md)  plugin last week. It's called  [Draft Indicator](https://github.com/beardicus/obsidian-draft-indicator-plugin) and all it does is stick a little ✎ pencil icon next to any file that is marked as `draft`.

![A screenshot of an Obsidian window, with two files listed in the file explorer panel. One filename, called "Yes a Draft" is italicized and has a small pencil icon to its right](draft-indicator-screenshot.png)
A screenshot of an Obsidian vault. There is a tiny pencil.

I thought this would be a fairly trivial bit of code to write – and it was – but when I first cloned [Obsidian's sample plugin template](https://github.com/obsidianmd/obsidian-sample-plugin) I was overwhelmed. It's full of ESLint and esbuild and TypeScript config files, and there are build scripts and dev servers and on and on.

I just wanted to write a little blob of JavaScript.

So I ripped a lot of stuff out. And I wrote my plugin in 42 lines of plain JavaScript, and it works fine and makes me happy.

I took what I learned from this process and made [obsidian-simple-sample-plugin](https://github.com/beardicus/obsidian-simple-sample-plugin), a template that implements the same API examples as the official sample plugin, but stripped down to plain JavaScript. If you have an idea for an Obsidian plugin but were intimidated by TypeScript and its associated tooling, maybe check it out.
