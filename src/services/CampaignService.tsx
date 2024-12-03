import { Campaign } from "../types/Campaign";
import { v4 as uuid } from "uuid";
import { NPC } from "../types/NPC";

//Used in the CampaignForm to create a new campaign using the information given in the form.
export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
    campaign={
        ...campaign,
        id:uuid()
    };

    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString);

    const newCampaigns = [
        ...allCampaigns,
        campaign
    ];

    localStorage.setItem("campaigns", JSON.stringify(newCampaigns));

    return campaign;
}

//
export const getCampaign = async (id: string): Promise<Campaign> =>{
    const allCampaigns=getCampaigns();
    const campaign=(await allCampaigns).find((campaign)=>campaign.id===id)
    return(
        campaign as Campaign
    )
}

//Needed in order for campaignList and findCampaign to work correctly.
export const getCampaigns = async ():Promise<Array<Campaign>>=>{
    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString) as Campaign[];

    return allCampaigns;
}

export const saveCampaign = async (campaignId:string): Promise<Campaign> =>{
    const allCampaigns=getCampaigns();
    const savedCampaign=getCampaign(campaignId);

    const savingCampaign = [
        ...await allCampaigns,
        savedCampaign
    ];

    localStorage.setItem("campaigns", JSON.stringify(savingCampaign));

    return(savedCampaign)

}

//NPC Section

//Take the npc as a new object of npc type
//get npc array of current campaign (getNPCs)
//make new array consisting of previous npcs array + the new npc
//set the new array as the array of NPCs for the current campaign
export const createNPC = async (npc: NPC, id:string): Promise<NPC> => {
    const campaign = await getCampaign(id)

    npc={
        ...npc,
        id:uuid()
    };

    const currentNPCS=getNPCs(id)
    const newNPC=[npc]

    const npcs=(await currentNPCS).concat(newNPC)

    campaign.npcs = npcs

    saveCampaign(id)

    console.log(campaign?.npcs)
    // const allNPCsString = localStorage.getItem("npcs");
    // const allNPCs = allNPCsString == null ? [] : JSON.parse(allNPCsString);

    // const newNPCs = [
    //     ...allNPCs,
    //     npc
    // ];

    // localStorage.setItem("npcs", JSON.stringify(newNPCs));

    return npc;
}

//get current campaign
//return the .npcs of the current campaign
export const getNPCs = async (campaignId:string): Promise<Array<NPC>>=>{
    const campaign =  await getCampaign(campaignId)
    return  campaign.npcs??[];
}

export const updateNPCs = ()=>{

}