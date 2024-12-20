import styles from "../css_modules/cardpage.module.css";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { ASSETS_PATH } from "../constants/assets_path";
import CardPanel from "../components/CardPanel";
import ToolBar from "../components/ToolBar";
import { useCampaign } from "../hooks/useCampaign";
import ThingList from "../components/ThingList";
import AddItem from "../components/AddItem";
import { Item } from "../types/Item";

function CampaignItems() {
  const { id } = useParams();

  const campaign = useCampaign(id as string);

  console.log(campaign);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${ASSETS_PATH}/fantasy_loot.webp)` }}
    >
      <div className={styles.bars}>
        <TopBar
          name="Items"
          image={`${ASSETS_PATH}/Emblem 1 3.png`}
          buttonNav={`/campaign/${campaign?.id}`}
        />

        <ToolBar />
      </div>

      <CardPanel>
        <AddItem campaignId={id as string}/>
        <ThingList things={campaign?.items as Array<Item>} campaign={campaign}/>
      </CardPanel>
    </main>
  );
}

export default CampaignItems;
