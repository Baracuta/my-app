import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";
import styles from "../css_modules/display.module.css";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PlayerCharacter } from "../types/PlayerCharacter";
import { Campaign } from "../types/Campaign";
import NPCDetails from "./DetailsNPC";
import LocationDetails from "./DetailsLocation";
import ItemDetails from "./DetailsItem";
import PlayerCharacterDetails from "./DetailsPlayerCharacter";
import DeleteDialogue from "./DeleteDialogue";
import AddNPC from "./AddNPC";
import AddLocation from "./AddLocation";
import AddItem from "./AddItem";
import AddPC from "./AddPC";

type DisplayProps = {
  thing: NPC | Location | Item | PlayerCharacter;
  campaign: Campaign;
  delete: (campaign: string, thing: string) => Promise<unknown>;
  edit: (
    campaign: string,
    thing: NPC | Location | Item | PlayerCharacter
  ) => Promise<unknown>;
};
//Make some sort of onClick component for the clickable star.
export default function ThingDisplay(props: DisplayProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.card}>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <p>{props.thing.name}</p>
      </Button>

      <Popover
        className={styles.popover}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 0 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className={styles.button_panel}>
          {props.thing.isFavourite ? (
            <StarIcon fontSize="large" />
          ) : (
            <StarBorderIcon fontSize="large" />
          )}
          {props.thing.type === "NPC" && (
            <AddNPC
              campaignId={props.campaign.id as string}
              addThing={props.edit}
              editNpc={props.thing}
            />
          )}
          {props.thing.type === "Location" && (
            <AddLocation
              campaignId={props.campaign.id as string}
              addThing={props.edit}
              editLocation={props.thing}
            />
          )}
          {props.thing.type === "Item" && (
            <AddItem
              campaignId={props.campaign.id as string}
              addThing={props.edit}
              editItem={props.thing}
            />
          )}
          {props.thing.type === "PC" && (
            <AddPC
              campaignId={props.campaign.id as string}
              addThing={props.edit}
              editPC={props.thing}
            />
          )}
          <DeleteDialogue
            delete={props.delete}
            thingID={props.thing.id}
            campaignID={props.campaign.id}
          />
          <button onClick={handleClose}>Close</button>
        </div>

        {props.thing.type === "NPC" && <NPCDetails npc={props.thing as NPC} />}
        {props.thing.type === "Location" && (
          <LocationDetails location={props.thing as Location} />
        )}
        {props.thing.type === "Item" && (
          <ItemDetails item={props.thing as Item} />
        )}
        {props.thing.type === "PC" && (
          <PlayerCharacterDetails pc={props.thing as PlayerCharacter} />
        )}
      </Popover>
    </div>
  );
}
