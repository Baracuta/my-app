import { Campaign } from "../types/Campaign";

export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString);

    const newCampaigns = [
        ...allCampaigns,
        campaign
    ];

    localStorage.setItem("campaigns", JSON.stringify(newCampaigns));

    return campaign;
}

export const getCampaign = async (id: string): Promise<Campaign> =>{
    return {
        id,
        name:"Pain"
    }
}

//export consts for getCampaigns and for updateCampaign to be made later

export const getCampaigns =  (n:number)=>{
    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString);

    var n=0
    for (var i=0; i<allCampaigns.length; i++){
        n=n++}
        console.log(n)


}