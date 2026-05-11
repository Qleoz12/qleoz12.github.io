---
layout: single
title: "Videos & slide decks"
permalink: /videos/
author_profile: true
toc: true
---

Browse uploads you curate here (data-driven). Edit `_data/videos.yml` and `_data/slides.yml`, then rebuild the site.

## Videos

{% assign vids = site.data.videos %}
{% if vids and vids.size > 0 %}
<div class="video-hub__grid">
{% for v in vids %}
  {% assign watch = v.url %}
  {% if watch == nil or watch == empty %}
    {% capture watch %}https://www.youtube.com/watch?v={{ v.youtube_id }}{% endcapture %}
  {% endif %}
  <article class="video-hub__card">
    <a class="video-hub__thumb" href="{{ watch }}" target="_blank" rel="noopener noreferrer">
      <img src="https://img.youtube.com/vi/{{ v.youtube_id }}/hqdefault.jpg" alt="{{ v.title | escape }}" loading="lazy" width="480" height="360" />
    </a>
    <div class="video-hub__body">
      <h3 class="video-hub__title"><a href="{{ watch }}" target="_blank" rel="noopener noreferrer">{{ v.title }}</a></h3>
      {% if v.date %}<p class="video-hub__meta">{{ v.date }}</p>{% endif %}
      {% if v.description %}<p>{{ v.description }}</p>{% endif %}
      {% if v.tags %}
      <p class="video-hub__tags">{% for t in v.tags %}<span class="video-hub__tag">{{ t }}</span>{% endfor %}</p>
      {% endif %}
      {% if v.related_post %}
      <p><a href="{{ v.related_post }}">Related post</a></p>
      {% endif %}
    </div>
  </article>
{% endfor %}
</div>
{% else %}
<p>No videos configured yet. Add entries to <code>_data/videos.yml</code>.</p>
{% endif %}

## Slide decks

{% assign decks = site.data.slides %}
{% if decks and decks.size > 0 %}
<ul class="video-hub__slides">
{% for s in decks %}
  <li>
    <a href="{{ s.url }}" target="_blank" rel="noopener noreferrer">{{ s.title }}</a>
    {% if s.topic %}<span class="video-hub__meta"> — {{ s.topic }}</span>{% endif %}
    {% if s.date %}<span class="video-hub__meta"> ({{ s.date }})</span>{% endif %}
  </li>
{% endfor %}
</ul>
{% else %}
<p>No slides configured yet. Add entries to <code>_data/slides.yml</code>.</p>
{% endif %}
