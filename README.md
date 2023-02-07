# Mapp Intelligence - Server-side NodeJS tracking library

[Site](https://mapp.com/) |
[Docs](https://documentation.mapp.com/latest/en/nodejs-library-19126449.html) |
[Support](https://github.com/mapp-digital/Mapp-Intelligence-Node-Tracking/issues) |
[Changelog](https://documentation.mapp.com/latest/en/changelog-19126479.html)

Server-side tracking is crucial for companies needing to measure mission-critical information on their website, such 
as order information or other website goals.

The NodeJS library of Mapp Intelligence helps customers to setup server-side tracking when using Mapp Intelligence as 
their analysis tool.

The basis for the data collection on your server is implementing the respective library. The Mapp Intelligence tracking 
library provides scripts to track user behavior and technical information, such as user agents, among others. In 
addition to the standard data collection, the tracking library offers many options to customize tracking based on 
specific use cases. Typical use cases are product, order and shipment tracking or the tracking of application processes.

# Development

## Requirements

| Software         | Version     |
|------------------|------------:|
| `docker`         |     `19.0+` |
| `docker-compose` |     `1.24+` |
| `make`           |             |

## Build

Build test and compile *Mapp Intelligence - Server-side NodeJS tracking library* with NodeJS 14.17.3 inside a docker container.

```bash
$ make build
```

## Test

Test *Mapp Intelligence - Server-side NodeJS tracking library* with NodeJS 10 - 16 inside a docker container.

```bash
$ make test-all
```

Test *Mapp Intelligence - Server-side NodeJS tracking library* with the current latest NodeJS version inside a docker container.

```bash
$ make test-latest
```

## Demo

Start a demo shop example on [0.0.0.0:8081](http://0.0.0.0:8081).

```bash
# start a demo shop example
$ make demo

# ssh access to the demo shop
$ m̀ake shop-ssh

# ssh access to the log files of the demo shop
$ m̀ake shop-log

# example for cronjob calls
$ m̀ake shop-cron-fail
$ m̀ake shop-cron-success
```
