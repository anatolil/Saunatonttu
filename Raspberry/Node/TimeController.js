class TimeController extends Controller {
	
	var route = "/get/unixtime";
	
	public function action(response, json, query)
	{
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end(getUnixtime);
	}
	
	private function getUnixtime()
	{
		var date = new Date('now');
		return JSON.stringify({ unixtime: date.getTime() });	
	}
}