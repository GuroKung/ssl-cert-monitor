
## Features
-------------
1. Check how many and what certificate is about to expire by given limit of time
2. Sorted list of host by expiration date
3. Schedule update
4. Provide API endpoint

## Configuration
-------------
All configuration store in config.json file
- hosts : lists of host we want to monitor
- scheduleTime: cronjob  
e.g. "0 0 * * * *"
- expireLimit: limit of expiration days   
e.g. 30 > want to check for cert that's expire in 30 days 

## API endpoint
-------------
### GET api/list
A sorted list of host information and expiration date

### GET api/expire  
show what certificate is about to expire

### Example response
```
{
    number: 3,
    items: [
        {
            host: 'a.com',
            from: DATE,
            to: DATE,
            expire: 1
        },
        {
            host: 'b.com',
            from: DATE,
            to: DATE,
            expire: 2
        },
        ...
    ]
}
```