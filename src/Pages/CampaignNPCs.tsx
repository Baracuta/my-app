import styles from "../css_modules/cardpage.module.css";
import { useParams } from "react-router-dom";
import { ASSETS_PATH } from "../constants/assets_path";
import CardPanel from "../components/CardPanel";
import ToolBar from "../components/ToolBar";
import TopBar from "../components/TopBar";
import AddNPC from "../components/AddNPC";
import { NPC } from "../types/NPC";
import { useCampaign } from "../hooks/useCampaign";
import ThingList from "../components/ThingList";

function CampaignNPCs() {
  const { id } = useParams();

  const campaign = useCampaign(id as string);

  console.log(campaign);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${ASSETS_PATH}/fantasy_npcs.jpg)` }}
    >
      <div className={styles.bars}>
        <TopBar
          name="Non-Player Characters"
          image={`${ASSETS_PATH}/Emblem 1 3.png`}
          buttonNav={`/campaign/${campaign?.id}`}
        />

        <ToolBar />
      </div>

      <CardPanel>
        <AddNPC campaignId={id as string} />
        <ThingList things={campaign?.npcs as Array<NPC>} campaign={campaign}/>
      </CardPanel>
    </main>
  );
}

export default CampaignNPCs;
