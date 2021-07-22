# PixelSheet

PixelSheet is a Google Sheets addon that provides an easy way to automatically create pixel art in a Google Sheet. It works by averaging color values across the image and recoloring the cells of the Sheet.

<p align="center">
   <img src="assets/happy.png" height="400" alt="Example 1"/>
</p>

## Overview

The app is separated into a frontend Google Sheets addon and a backend webservice due to limitations on accessing external resources and third-party libraries imposed by Google AppsScript. The PixelSheet [frontend](addon/) consists of a Google Sheets addon written in AppsScript. The [backend](service/) consists of a Node.js application using Express.js to parse images. The backend _was_ hosted on RedHat OpenShift.

<p align="center">
   <img src="assets/architecture.png" alt="Architecture"/> 
</p>

## Getting Started

### Dependencies

* `npm`
* Google Account

### Before Using

* The backend Node application needs to be publicly hosted.
* The addon features a hardcoded endpoint that needs to be updated.
* Many dependencies are out of date and have vulnerabilities.

### Using

To use PixelSheet the files in the [addon](addon/) folder need to be attached to a Google AppsScript project associated with your Google Account. For details on how to do this see [here](https://developers.google.com/apps-script/overview). Then you can enable it on your account and use it with any Google Sheet.

<p align="center">
   <img src="assets/image-size.png" height="400" alt="Example 2"/> 
   <img src="assets/sheets-logo.png" height="400" alt="Example 3"/> 
</p>