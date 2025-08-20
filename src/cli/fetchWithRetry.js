import axios from 'axios'


const sleep=(ms)=> new Promise((res)=>setTimeout(res,ms));
const fetchWithRetry=async(url,headers)=>{


    let no_of_attempts=0;
    let error;
    while(no_of_attempts<3){

        try{
            const res=await axios.get(url,{headers});
            return res;
        }catch(err){
            error=err
            const status=err.response?.status;
            const remaining = err.response?.headers["x-ratelimit-remaining"];
            const reset = err.response?.headers["x-ratelimit-reset"];
            
            if((status===403 || status=== 429 ) && remaining==="0" && reset){
                const resetTime=parseInt(reset,10)*1000;
                const waitTime=resetTime-Date.now()

                await sleep(waitTime)
            }else {
                const waitTime=Math.pow(3,no_of_attempts)*1000;
                await sleep(waitTime)
            }
        }
        ++no_of_attempts;
    }
    throw error
}
export default fetchWithRetry