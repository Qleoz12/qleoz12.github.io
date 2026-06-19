---
title:  "Create Your Own CDN and Try Your Web Components Online"
search: false
categories: 
  - Web/webcomponents
date: 2024-08-12
last_modified_at: 2024-08-12T08:06:00-05:00
share: linkedin
---


## Introduction

In this post, I'll show you how to create your own Content Delivery Network (CDN) and use it to test your web components online.

By leveraging GitHub Pages, you can set up a personal CDN to host your web components. In my case, I created a GitHub repository that serves as my personal CDN, which you can find https://github.com/Qleoz12/static Let’s call it "static" for now.

### Setting Up Your CDN
- Create a GitHub Repository: Start by creating a simple repository on GitHub.
- Enable GitHub Pages: Go to the repository settings and enable GitHub Pages to make your content available online.
- Upload Your Content: Add your web components, images, or any other content you want to share online to the repository.
- Test Your Links: Make sure the links to your content are working correctly and are accessible online.

### Creating Web Components
Once your CDN is set up, you can create and upload web components. For example, I created a web component for a business card to display my contact information online. You can check out the code 
```link
https://github.com/Qleoz12/svelte-web-components-template/blob/master/packages/lib/src/profile-card.wc.svelte
```
**not forget give star a my repo ⭐**

Upload the web component to your CDN and test the link to ensure it is available online. In my case, the library is deployed at this

```link
 https://github.com/Qleoz12/static/tree/main/js/webcomponents
```

### Try the webcomponent online
I used my personal portfolio and a React project to test the integration of webcomponent and it works perfectly.

just add the library reference and use the webcomponent in your project.

```html
<script src="https://qleoz12.github.io/static/js/webcomponents/profile-card.wc.js"></script>


<profile-card></profile-card>
```


check the pages: 
- Jekyll Blog Integration: Check out how I integrated a web component into my blog on the About - Dann Brown Adventures ->about  [qleoz12.github.io](https://qleoz12.github.io/about/)

- React App Integration: See the integration with a React app using Vite + React + TS [qleoz12.github.io](https://qleoz12.github.io/React-Encriptador-Oracle-Alura-GIT-ACTIONS/)


## Explanation:

Below is an image illustrating the flow of creating your own CDN and trying out your web components online. It also helps you understand how the repositories are connected.

also check my youtube video 

<img src="https://raw.githubusercontent.com/Qleoz12/qleoz12.github.io/master/assets/images/graphs/cdn-webcomponents.drawio.svg">

<div class="responsive-wrap">
<!-- this is the embed code provided by Google -->
  <iframe src="https://docs.google.com/presentation/d/1s9LRgqhLGTXlE031cYilrd1BiI42YKtDNUoJFdbhftw/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
<!-- Google embed ends -->
</div>





## Conclusion:
with this discover now your able to expose trought internet new creation, update content for your clients, and share your work with the world. working one time

## References

- [The Top 10 Content Delivery Networks (CDNs)](https://expertinsights.com/insights/the-top-content-delivery-networks-cdns)
- [How to get a literally free CDN - DEV Community](https://dev.to/jcubic/how-to-get-a-literally-free-cdn-2gc1)
- [6 Free CDN Services (to Speed Up Your Website in 2024)]([webfx.com](https://www.webfx.com/blog/web-design/free-public-cdns/))
- [American Psycho -Business Card Scene (youtube.com)](https://www.youtube.com/watch?v=cISYzA36-ZY)
