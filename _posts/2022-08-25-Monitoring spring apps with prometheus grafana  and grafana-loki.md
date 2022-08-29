---
title:  "Monitoring Spring apps with prometheus grafana and grafana-loki bonus-micrometer "
search: false
categories: 
  - java/spring/cloud/grafana-overview
date: 2022-08-25
last_modified_at: 2022-08-25T08:06:00-05:00
---

## Concept

<q>how to follow request throught the complex services interaction?</q>

<q> how watch and create alerts for any events in your apps</q>

<q>how create custom metrics ?</q> 



the companies with Cloud arquitectures, them must to watch the variety arquitectures of several solutions 
and how them interact between them, and detect errors fast and easier,in ald days you must to check the logs files 
but is not a good aproach when you have a lot or microservices and you are checkin a transaction among different
paths it could be take, hence the next aplications will show the way to handle this kind of situations


  <img src="https://raw.githubusercontent.com/grafana/grafana/main/docs/logo-horizontal.png" alt="">


### Grafana 
allows you to query, visualize, alert on and understand your metrics no matter where they are stored. Create, explore, and share dashboards with your team and foster a data-driven culture:

Visualizations: Fast and flexible client side graphs with a multitude of options. Panel plugins offer many different ways to visualize metrics and logs.

Dynamic Dashboards: Create dynamic & reusable dashboards with template variables that appear as dropdowns at the top of the dashboard.
Explore Metrics: Explore your data through ad-hoc queries and dynamic drilldown. Split view and compare different time ranges, queries and data sources side by side.
Explore Logs: Experience the magic of switching from metrics to logs with preserved label filters. Quickly search through all your logs or streaming them live.
Alerting: Visually define alert rules for your most important metrics. Grafana will continuously evaluate and send notifications to systems like Slack, PagerDuty, VictorOps, OpsGenie.
Mixed Data Sources: Mix different data sources in the same graph! You can specify a data source on a per-query basis. This works for even custom datasources.



### Grafana loki

<img src="https://raw.githubusercontent.com/grafana/loki/main/docs/sources/logo_and_name.png" alt="">

Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by Prometheus. It is designed to be very cost effective and easy to operate. It does not index the contents of the logs, but rather a set of labels for each log stream.

 A Loki-based logging stack consists of 3 components:

- promtail is the agent, responsible for gathering logs and sending them to Loki.
- loki is the main server, responsible for storing logs and processing queries.
- Grafana for querying and displaying the logs.


### Prometheus

<img src="https://raw.githubusercontent.com/prometheus/prometheus/8cc7b7e57798553f026c1b6f3085f81f4661ede7/web/ui/react-app/src/images/prometheus_logo_grey.svg"  alt="" style="background: #DF5430;">

prometheus.io
Prometheus is an open-source systems monitoring and alerting toolkit originally built at SoundCloud. Since its inception in 2012, many companies and organizations have adopted Prometheus, and the project has a very active developer and user community. It is now a standalone open source project and maintained independently of any company. To emphasize this, and to clarify the project's governance structure, Prometheus joined the Cloud Native Computing Foundation in 2016 as the second hosted project, after Kubernetes.

usual after 2016
Prometheus, a Cloud Native Computing Foundation project, is a systems and service monitoring system. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts when specified conditions are observed.




<div class="responsive-wrap">
<!-- this is the embed code provided by Google -->
  <iframe src="https://docs.google.com/presentation/d/1Kugmmwna7YEz7gCah9IFGPsnOcLGYv3E5IdXjMFzReI/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
<!-- Google embed ends -->
</div>





## References

- https://github.com/prometheus/prometheus
- https://github.com/grafana/grafana
- https://github.com/Qleoz12/spring-monitoring-demo?organization=Qleoz12&organization=Qleoz12
- https://github.com/thbrunzendorf/monitoring-demo

