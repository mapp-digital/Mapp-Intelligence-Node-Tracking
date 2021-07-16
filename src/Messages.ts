export class Messages {
    // Mapp Intelligence tracking
    private static readonly REQUIRED_TRACK_ID_AND_DOMAIN: string = 'The Mapp Intelligence \'trackDomain\' and \'trackId\' are required to';
    public static readonly TO_LARGE_BATCH_SIZE: string = 'Batch size is larger than ${0} req. (${1} req.)';
    public static readonly TO_LARGE_PAYLOAD_SIZE: string = 'Payload size is larger than 24MB (${0}MB)';
    public static readonly GENERIC_ERROR: string = '${0} (${1})';
    public static readonly CREATE_NEW_LOG_FILE: string = 'Create new file ${0} (${1})';
    public static readonly USE_EXISTING_LOG_FILE: string = 'Use existing file ${0} (${1})';
    public static readonly DIRECTORY_NOT_EXIST: string = 'Directory not exist ${0}';
    public static readonly CANNOT_RENAME_TEMPORARY_FILE: string = 'Create new file, because cannot rename temporary file';
    public static readonly WRITE_BATCH_DATA: string = 'Write batch data in ${0} (${1} req.)';
    public static readonly EXECUTE_COMMAND: string = 'Execute command: ${0}';
    public static readonly SEND_BATCH_DATA: string = 'Send batch data to ${0} (${1} req.)';
    public static readonly BATCH_REQUEST_STATUS: string = 'Batch request responding the status code ${0}';
    public static readonly BATCH_RESPONSE_TEXT: string = '[${0}]: ${1}';
    public static readonly REQUIRED_TRACK_ID_AND_DOMAIN_FOR_COOKIE: string = Messages.REQUIRED_TRACK_ID_AND_DOMAIN + ' get user cookie';
    public static readonly REQUIRED_TRACK_ID_AND_DOMAIN_FOR_TRACKING: string = Messages.REQUIRED_TRACK_ID_AND_DOMAIN + ' track data';
    public static readonly TRACKING_IS_DEACTIVATED: string = 'Mapp Intelligence tracking is deactivated';
    public static readonly SENT_BATCH_REQUESTS: string = 'Sent batch requests, current queue size is ${0} req.';
    public static readonly BATCH_REQUEST_FAILED: string = 'Batch request failed!';
    public static readonly CURRENT_QUEUE_STATUS: string = 'Batch of ${0} req. sent, current queue size is ${1} req.';
    public static readonly QUEUE_IS_EMPTY: string = 'MappIntelligenceQueue is empty';
    public static readonly ADD_THE_FOLLOWING_REQUEST_TO_QUEUE: string = 'Add the following request to queue (${0} req.): ${1}';
    public static readonly MAPP_INTELLIGENCE: string = '[Mapp Intelligence]: ';

    // Mapp Intelligence cronjob
    public static readonly REQUIRED_TRACK_ID: string = 'Argument \'-i\' or alternative \'--trackId\' are required';
    public static readonly REQUIRED_TRACK_DOMAIN: string = 'Argument \'-d\' or alternative \'--trackDomain\' are required';
    public static readonly UNSUPPORTED_OPTION: string = 'Unsupported config option';
    public static readonly OPTION_TRACK_ID: string = 'Enter your Mapp Intelligence track ID provided by Mapp.';
    public static readonly OPTION_TRACK_DOMAIN: string = 'Enter your Mapp Intelligence tracking domain.';
    public static readonly OPTION_CONFIG: string = 'Enter the path to your configuration file (*.json or *.js).';
    public static readonly OPTION_FILE_PATH: string = 'Enter the path to your request logging files.';
    public static readonly OPTION_FILE_PREFIX: string = 'Enter the prefix for your request logging files.';
    public static readonly OPTION_DEACTIVATE: string = 'Deactivate the tracking functionality.';
    public static readonly OPTION_HELP: string = 'Display the help (this text) and exit.';
    public static readonly OPTION_DEBUG: string = 'Activates the debug mode. The debug mode sends messages to the command line.';
    public static readonly OPTION_VERSION: string = 'Display version and exit.';
    public static readonly REQUEST_LOG_FILES_NOT_FOUND: string = 'Request log files "${0}" not found';
    public static readonly RENAME_EXPIRED_TEMPORARY_FILE: string = 'Rename expired temporary file into log file';
    public static readonly HELP_SYNTAX: string = 'node ./mapp-intelligence-java-cronjob.js';
    public static readonly HELP_HEADER: string = 'Send the logfile requests to the Mapp tracking server and delete your logfiles to keep it at a manageable size.\n';
    public static readonly HELP_FOOTER: string = '';
}
