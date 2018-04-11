
basicPipeline {
    name = 'iuc-web'
    env = [
        'dev':[:],
        'test':[:],
        'prod':[:]
    ]
    templates = [
        'build':[
            ['file':'openshift/iuc-web.bc.json']
        ],
        'deployment':[
            ['file':'openshift/iuc-web.dc.json', 'params':['HOST':'${env[DEPLOY_ENV_NAME]?.params?.host?:""}']]
        ]
    ]
}
