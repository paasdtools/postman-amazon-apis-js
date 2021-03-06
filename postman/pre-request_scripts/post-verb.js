// Use private key PEM variable to create a new RequestSigner
var signer = new bmc.RequestSigner(environment["PRIVATE_KEY_PEM"]);

// Create read-only object containing the request context
var context = {
	API_HOST : "iaas.us-phoenix-1.oraclecloud.com",
	API_VERSION : "20160918",
	API_TENANCY : environment["TENANCY"],
	API_USER : environment["API_USER"],
	API_FINGERPRINT : environment["API_FINGERPRINT"]
};

var _request = {
	method : request.method,
	url : request.url.trim(),
	headers : request.headers,
	data : request.data,
	dataMode : request.dataMode
};

// Set POSTMAN environment variables associated with url
postman.setEnvironmentVariable('API_HOST', context["API_HOST"]);
postman.setEnvironmentVariable('API_VERSION', context["API_VERSION"]);

var atz_header = signer.sign(context, _request);

// Set POSTMAN environment variables associate with headers
postman.setEnvironmentVariable("AUTHORIZATION_HEADER", atz_header);
postman.setEnvironmentVariable('REQUEST_TARGET_HEADER', signer.headers["REQUEST_TARGET"]);
postman.setEnvironmentVariable('DATE_HEADER', signer.headers["DATE"]);
postman.setEnvironmentVariable("OPC_REQUEST_ID_HEADER", signer.headers["OPC_REQUEST_ID"]);

// Set POSTMAN environment variables associate with additional headers
postman.setEnvironmentVariable('X_CONTENT_SHA256_HEADER', signer.headers["X_CONTENT_SHA256"]);
postman.setEnvironmentVariable('CONTENT_LENGTH_HEADER', signer.headers["CONTENT_LENGTH"]);