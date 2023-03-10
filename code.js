// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;
log(`${Script.name()}.js`)

//CHECK CODE
updateversionlink = "https://raw.githubusercontent.com/ed246810/Scriptable-updatable-code/main/version.json"
scriptlink="https://raw.githubusercontent.com/ed246810/Scriptable-updatable-code/main/code.js"

//FUNCTION
async function getDataJSON(link)
{
	let req = await new Request(link)
	let res = await req.loadJSON()
	return res
}


async function checkupdate(version)
{
	updateinfo = await getDataJSON(updateversionlink)
	latestversion = updateinfo.version
	log("lastest version - "+latestversion)	
	
	if(version != latestversion)
	{
		//GET LATEST CODE
		let req = new Request(scriptlink)
		updatedcode = await req.loadString()
		//FIND SCRIPT LOCATION ON DEVICE
		fm = FileManager.iCloud()
		let path = fm.joinPath(fm.documentsDirectory(),`${Script.name()}.js`)
		log(path)
		//UPDATE SCRIPT
		fm.writeString(path,updatedcode)
		throw new Error("Update Complete")
	}

}



await checkupdate(1.0)
