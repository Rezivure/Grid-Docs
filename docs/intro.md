---
sidebar_position: 1
---

# Disclaimer (Read Me Please!)

Welcome! We are glad you are here. We urge you to read our disclaimer prior to getting started.

## What is Grid?

Grid is an open source project for live location sharing centered on privacy and end-to-end encryption (E2EE). Grid is currently
built by a small team with one developer. Grid utilizes the Matrix Protocol (https://matrix.org) for E2EE and the Matrix Synapse (https://github.com/element-hq/synapse)
server implementation for the backend. Grid is the "front end" client that utilizes the E2EE messaging stack of Synapse for location sharing. 

Grid is built with Flutter, for cross platform capability across iOS and Android. Grid is not currently intended to be used as an "add-on" or in conjunction with the primary uses of Matrix, therefore please read the warning below if you are considering self hosting.

## ⚠️Warning to Self Hosters⚠️

**If self hosting, use a new account on your Matrix server.**
Grid is not currently intended to be used in conjunction with
an account utilized for messaging (Element, Fluffychat, etc). Grid will "clean up" all non-Grid created Matrix rooms. Please 
see <code>Self Hosting</code> in the sidebar for more specifics on self hosting.

**Grid is not tested for Federation** therefore we do not recommend you use federated servers. Grid was developed to utilize Matrix for E2EE, but has not 
been designed or tested to integrate with federated servers. Therefore, please do not utilize Grid with your homeserver with the presumption that standard 
Matrix client's functionality, like Element, will apply to Grid. We are exploring how to properly integrate Grid into federation, etc. however, our first goal 
was to provide a E2EE location sharing alternative that can be easily self hosted.

**Grid has not been extensively tested on different homeservers** therefore please continue at your own risk if self hosting. The security of your stack and homeserver
is your responsibility, as Grid is just the client to implement location sharing.

**Map Tiles are not E2EE.** Grid utilizes Protomaps to provide map tiles. You can read more about map tile privacy at: https://mygrid.app/mapdata/. Protomaps is a 
serverless map tile solution where tiles can be delivered via byte range from a file. Currently, Grid utilizes Protomaps which is hosted in Cloudflare for privacy
considerations. Grid does not keep logs of requested tiles; however, Cloudflare may log some details for metrics, analytics, etc. Cloudflare's privacy policy can be found at https://www.cloudflare.com/privacypolicy/. For self hosting, we support the utilization of our hosted maps; however, we also have documentation for self hosting your own map tiles as well.


## Privacy Policy and Terms 

You can view our privacy policy at: https://mygrid.app/privacy.

You can view our terms at: https://mygrid.app/terms.

## Follow our Progress

You can follow our progress on our **blog** at https://rezivure.io or join our Matrix space at https://matrix.to/#/#grid:matrix.org.

## Contact Us

Please reach out to us on our Matrix space above, or at contact@mygrid.app!
