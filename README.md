# Webflow on Next.js

This repo is a part of my [Integrating Webflow and Next.js](https://dev.to/kennedyrose/integrating-webflow-and-next-js-39kk) article. It is an [ADI](https://kennedyrose.com/blog/intro-to-adi-patterns) implementation with [Next.js](https://nextjs.org/docs/getting-started) / [Webflow](https://webflow.com/).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fkennedyrose%2Fwebflow-on-next&env=WEBFLOW_URL&envDescription=Your%20Webflow%20URL%20with%20no%20trailing%20slash)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kennedyrose/webflow-on-next)

![Architecture diagram](https://res.cloudinary.com/practicaldev/image/fetch/s--cKCeDDBP--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://kennedyrose.com/static/images/webflow-on-next/webflow-on-next-diagram.gif)

## How to inject custom widgets into WebFlow Theme

Let us take [Leagent](leagent.com) as a good example of the widgets one can use to inject into the WebFlow theme. Leagent supports a set of different widgets, here are they:

###### Grid of properties
    <div data-type="grid" class="leagent-widget"
     data-address=""
     data-sold=""
     data-page=""
     data-count=""
     data-row-sm=""
     data-row-md=""
     data-row-lg=""></div>

###### Carousel of properties
    <div data-type="carousel" class="leagent-widget"
     data-address=""
     data-sold=""
     data-page=""
     data-count=""
     data-row-sm=""
     data-row-md=""
     data-row-lg=""
     data-no-arrows-sm=""
     data-no-arrows-md=""
     data-no-arrows-lg=""></div>

###### Property header
    <div data-type="property-banner" class="leagent-widget"
     data-id=""></div>

###### Property highlights
    <div data-type="property-highlights" class="leagent-widget"
     data-id=""></div>

###### Property information
    <div data-type="property-info" class="leagent-widget"
     data-id=""></div>

###### Property gallery
    <div data-type="property-gallery" class="leagent-widget"
     data-id=""></div>

###### Features of the property
    <div data-type="property-features" class="leagent-widget"
     data-id=""></div>

###### Property history
    <div data-type="property-history" class="leagent-widget"
     data-id=""></div>

###### Mortgage calculator
    <div data-type="property-mortgage" class="leagent-widget"
     data-id=""></div>

###### Map street view
    <div data-type="property-map-street" class="leagent-widget"
     data-id=""
     data-height=""
     data-width="" style="height:; width: ; "></div>

###### Map of neighbourhood
    <div data-type="property-map-neighbourhood" class="leagent-widget"
     data-id=""
     data-height=""
     data-width="" style="height:; width: ; "></div>

###### Map view
    <div data-type="map" class="leagent-widget"
     data-saved=""
     data-own=""></div>

###### Profile Button
    <div data-type="profile-btn" class="leagent-widget"
     data-target="#"></div>

###### Search bar
    <div data-type="search" class="leagent-widget"
     data-btn="1"
     data-icon="1"
     data-highlight="1"></div>


### Integration of widgets with WebFlow
This means that one needs to add "data" attributes to the ```div``` blocks.
WebFlow allows for adding of custom attributes to the blocks.

For any widgets, it is important to include the JS file into the body of document. 
Similar to Google Maps or so. This is why we introduce another Env Var ```WIDGETS_URL```. 

