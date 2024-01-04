"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import OverlayImages from "../components/OverlayImages";
import BasicModal from "../components/BasicModal";
import Steps from "../components/Steps";
import OptionCard from "../components/OptionCard";
import { getQuery } from "../hygraph";
import ViewOrder from "../components/ViewOrder";
import StartOver from "../components/StartOver";
import Tawk from "../components/Tawk";

interface Image {
  height: number;
  width: number;
  url: string;
}

interface Item {
  id: string;
  name: string;
  defaultItem: boolean;
  description: string;
  image: Image;
  laborHours: number;
  price: number | null;
  sku: string;
  toolTip: string;
}

interface Option {
  id: string;
  name: string;
  defaultItem: boolean | null;
  description: string | null;
  image: Image | null;
  laborHours: number | null;
  price: number | null;
  sku: string | null;
  toolTip: string | null;
}

interface OptionGroup {
  description: string | null;
  id: string;
  name: string;
  optionGroup: Option[];
}

interface StepCategory {
  description: string | null;
  id: string;
  name: string;
  optionGroups: OptionGroup[];
}

interface VanType {
  basePrice: number;
  description: string;
  id: string;
  name: string;
  laborHours: number;
  image: Image;
  sku: string;
  stepCategories: StepCategory[];
}

export default function Home() {
  const floorColorId = "clp7pxe2k7yb40bllal9wiy6o";
  const wireHarnessId = "clp90zqnh9e1n0an2la46jzuw";
  const powerSystemId = "clp9116mq4ee10bn4136zm1dr";
  const ceilingPanelId = "clpoem3ar6f4g0bn4ke845cmn";
  const ventilationId = "clppvbaocuewr0bn4icgwgoev";
  const CeilingLightingId = "clpofb856gtez0blk3ha9r36s";
  const wallPanelsId = "clpt5vqdy44j80blrpfgh2oat";
  const wallInsulationId = "clpwz888h6nef0amzkz46l9xk";
  const trimKitId = "clpyep8g2tkmu0alqrky3v2hr";
  const installationId = "clpyew2c4tov30alqw8dqf4n0";

  const [hyquery, setHyQuery] = useState<VanType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [step, setStep] = useState("clp20yr1ac0q10an660ovlpjw");
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [floorOption, setFloorOption] = useState<Item | null>(null);
  const [wiringHarness, setWiringHarness] = useState<Item | null>(null);
  const [powerSystem, setPowerSystem] = useState<Item | null>(null);
  const [ceilingPanel, setCeilingPanel] = useState<Item | null>(null);
  const [ceilingLighting, setCeilingLighting] = useState<Item | null>(null);
  const [ventalation, setVentalation] = useState<Item | null>(null);
  const [walls, setWalls] = useState<Item | null>(null);
  const [insulation, setInsulation] = useState<Item | null>(null);
  const [trim, setTrim] = useState<Item | null>(null);

  const [groupNamesFromChild, setGroupNamesFromChild] = useState(0);

  const handleGroupNames = (groupNames: number[]) => {
    setGroupNamesFromChild(groupNames.length);
  };
  interface StepCategory {
    name: string;
    id: string;
  }
  const uniqueStepCategories = hyquery.reduce<StepCategory[]>(
    (accumulator, vanType) => {
      vanType.stepCategories.forEach((stepCategory: any) => {
        const categoryExists = accumulator.some(
          (category) => category.name === stepCategory.name
        );
        if (!categoryExists) {
          accumulator.push({
            name: stepCategory.name,
            id: stepCategory.id,
          });
        }
      });
      return accumulator;
    },
    []
  );

  const fullQuery = async () => {
    const result = await getQuery();
    setHyQuery(result?.vanTypes);
  };

  const handleModalChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleStepChange = (id: string) => {
    setStep(id);
    setCurrentGroupIndex(0);
    localStorage.setItem("step", id);
  };
  const showNextGroup = () => {
    if (currentGroupIndex === groupNamesFromChild - 1) {
      let nextStep = getNextId(uniqueStepCategories, step);
      setStep(nextStep);
      setCurrentGroupIndex(0);
      localStorage.setItem("step", nextStep);
    } else {
      setCurrentGroupIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to show previous group
  const showPreviousGroup = () => {
    if (currentGroupIndex === 0) {
      let previousStep = getPreviousId(uniqueStepCategories, step);
      setStep(previousStep);
      localStorage.setItem("step", previousStep);
    } else {
      setCurrentGroupIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  function getNextId(items: any, currentId: any) {
    const currentIndex = items.findIndex((item: any) => item.id === currentId);
    if (currentIndex === -1 || currentIndex === items.length - 1) {
      return currentId;
    }
    return items[currentIndex + 1].id;
  }

  function getPreviousId(items: any, currentId: any) {
    const currentIndex = items.findIndex((item: any) => item.id === currentId);
    if (currentIndex <= 0) {
      return currentId;
    }
    return items[currentIndex - 1].id;
  }

  const handleSelectItem = (item: any, itemStep: string) => {
    let optGroup = itemStep;
    //   console.log(optGroup);
    switch (optGroup) {
      case "clp7pxe2k7yb40bllal9wiy6o":
        setFloorOption(item);
        localStorage.setItem("lsFloorOption", JSON.stringify(item));
        break;
      case "clp90zqnh9e1n0an2la46jzuw":
        setWiringHarness(item);
        localStorage.setItem("lsWiringHarness", JSON.stringify(item));
        break;
      case "clp9116mq4ee10bn4136zm1dr":
        setPowerSystem(item);
        localStorage.setItem("lsPowerSystem", JSON.stringify(item));
        break;
      case "clpoem3ar6f4g0bn4ke845cmn":
        setCeilingPanel(item);
        localStorage.setItem("lsCeilingPanel", JSON.stringify(item));
        break;
      case "clpofb856gtez0blk3ha9r36s":
        setCeilingLighting(item);
        localStorage.setItem("lsCeilingLighting", JSON.stringify(item));
        break;
      case "clppvbaocuewr0bn4icgwgoev":
        setVentalation(item);
        localStorage.setItem("lsVentilation", JSON.stringify(item));
        break;
      case "clpt5vqdy44j80blrpfgh2oat":
        setWalls(item);
        localStorage.setItem("lsWalls", JSON.stringify(item));
        break;
      case "clpwz888h6nef0amzkz46l9xk":
        setInsulation(item);
        localStorage.setItem("lsInsulation", JSON.stringify(item));
        break;
      case "clpyep8g2tkmu0alqrky3v2hr":
        setTrim(item);
        localStorage.setItem("lsTrim", JSON.stringify(item));
        break;
    }
  };

  const allOptionGroups = hyquery.reduce((accumulator, vanType) => {
    vanType.stepCategories.forEach((stepCategory: any) => {
      accumulator = accumulator.concat(stepCategory.optionGroups);
    });
    return accumulator;
  }, []);

  function loadDefaults() {
    let stepCheck = localStorage.getItem("step");
    const floorStepRaw = localStorage.getItem("lsFloorOption");
    let floorStep;
    if (floorStepRaw !== null) {
      floorStep = JSON.parse(floorStepRaw);
    }

    let floorDefault = getDefaultItem(allOptionGroups, floorColorId);

    const WireHarnessRaw = localStorage.getItem("lsWiringHarness");
    let localWireHarness;
    if (WireHarnessRaw !== null) {
      localWireHarness = JSON.parse(WireHarnessRaw);
    }

    let WireHarnessDefault = getDefaultItem(allOptionGroups, wireHarnessId);

    const powerSystemRaw = localStorage.getItem("lsPowerSystem");
    let localPowerSystem;
    if (powerSystemRaw !== null) {
      localWireHarness = JSON.parse(powerSystemRaw);
    }

    let PowerSystemDefault = getDefaultItem(allOptionGroups, powerSystemId);

    const ceilingPanelRaw = localStorage.getItem("lsCeilingPanel");
    let localCeilingPanel;
    if (ceilingPanelRaw !== null) {
      localCeilingPanel = JSON.parse(ceilingPanelRaw);
    }
    let CeilingPanelDefault = getDefaultItem(allOptionGroups, ceilingPanelId);

    const ventilationRaw = localStorage.getItem("lsVentilation");
    let localVentilation;
    if (ventilationRaw !== null) {
      localVentilation = JSON.parse(ventilationRaw);
    }

    let VentilationDefault = getDefaultItem(allOptionGroups, ventilationId);

    const ceilingLightingRaw = localStorage.getItem("lsCeilingLighting");
    let localCeilingLighting;
    if (ceilingLightingRaw !== null) {
      localCeilingLighting = JSON.parse(ceilingLightingRaw);
    }

    let CeilingLightingDefault = getDefaultItem(
      allOptionGroups,
      CeilingLightingId
    );

    const wallsRaw = localStorage.getItem("lsWalls");
    let localWalls;
    if (wallsRaw !== null) {
      localCeilingLighting = JSON.parse(wallsRaw);
    }

    let WallsDefault = getDefaultItem(allOptionGroups, wallPanelsId);

    const insulationRaw = localStorage.getItem("lsInsulation");
    let localInsulation;
    if (insulationRaw !== null) {
      localInsulation = JSON.parse(insulationRaw);
    }
    let InsulationDefault = getDefaultItem(allOptionGroups, wallInsulationId);

    const trimRaw = localStorage.getItem("lsTrim");
    let localTrim;
    if (trimRaw !== null) {
      localTrim = JSON.parse(trimRaw);
    }
    let TrimDefault = getDefaultItem(allOptionGroups, trimKitId);
    if (stepCheck) {
      setStep(stepCheck);
    }
    setFloorOption(floorStep || floorDefault);
    setWiringHarness(localWireHarness || WireHarnessDefault);
    setPowerSystem(localPowerSystem || PowerSystemDefault);
    setCeilingPanel(localCeilingPanel || CeilingPanelDefault);
    setCeilingLighting(localCeilingLighting || CeilingLightingDefault);
    setVentalation(localVentilation || VentilationDefault);
    setWalls(localWalls || WallsDefault);
    setInsulation(localInsulation || InsulationDefault);
    setTrim(localTrim || TrimDefault);
  }

  useEffect(() => {
    fullQuery();
  }, []);

  useEffect(() => {
    loadDefaults();
  }, [hyquery]);

  function getFirstImageUrl(hyquery: any, id: string) {
    const item = hyquery.find((item: any) => item.id === id);
    return item && item.image ? item.image.url : null;
  }
  const vanBaseImage = getFirstImageUrl(hyquery, "clp20wntffhgf0blutxpdtbcd");

  function getDefaultItem(data: any, optionGroupId: string) {
    const optionGroup = data.find((group: any) => group.id === optionGroupId);
    if (optionGroup && optionGroup.optionGroup) {
      return optionGroup.optionGroup.find(
        (item: any) => item.defaultItem === true
      );
    }
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col flex-wrap items-center justify-between">
      <div>
        <Image
          className="main-bg"
          src="/SVB_170_Backplate_v01_0067.jpg"
          alt=""
          width={1920}
          height={1080}
        />
        {hyquery.length > 0 && !isModalOpen && vanBaseImage && (
          <>
            <OverlayImages vanimage={vanBaseImage} />
            {floorOption?.image && (
              <OverlayImages vanimage={floorOption.image?.url} />
            )}
            {wiringHarness?.image && (
              <OverlayImages vanimage={wiringHarness.image?.url} />
            )}
            {insulation?.image && (
              <OverlayImages vanimage={insulation.image?.url} />
            )}
            {ceilingPanel?.image && (
              <OverlayImages vanimage={ceilingPanel.image?.url} />
            )}
            {ventalation?.image && (
              <OverlayImages vanimage={ventalation.image?.url} />
            )}
            {ceilingLighting?.image && (
              <OverlayImages vanimage={ceilingLighting.image?.url} />
            )}

            {walls?.image && <OverlayImages vanimage={walls.image?.url} />}

            {trim?.image && <OverlayImages vanimage={trim.image?.url} />}
            {powerSystem?.image && (
              <OverlayImages vanimage={powerSystem.image?.url} />
            )}
          </>
        )}
      </div>
      <div className="content-overlay">
        {hyquery.length > 0 && !isModalOpen && (
          <>
            <OptionCard
              showNextGroup={showNextGroup}
              showPreviousGroup={showPreviousGroup}
              currentGroupIndex={currentGroupIndex}
              step={step}
              hyquery={hyquery}
              onSelectItem={handleSelectItem}
              onGroupNamesChange={handleGroupNames}
              floorOption={floorOption}
              wiringHarness={wiringHarness}
              powerSystem={powerSystem}
              ceilingPanel={ceilingPanel}
              ceilingLighting={ceilingLighting}
              ventalation={ventalation}
              walls={walls}
              insulation={insulation}
              trim={trim}
            />
            <Steps
              onstepChange={handleStepChange}
              step={step}
              hyquery={hyquery}
            />
            <ViewOrder />
            <StartOver />
          </>
        )}
      </div>
      <BasicModal
        title="A NOTE ON LEAD TIMES"
        subtitle="While our Interior Systems currently ship in 4-6 weeks, certain items such as mattresses, bamboo paneling and third party products may have longer lead times. Please inquire with your Customer Service Rep by emailing info@adventurewagon.com or calling 503-427-0140 to get an accurate lead time on your entire order."
        open={isModalOpen}
        onOpenChange={handleModalChange}
      />
      <Tawk />
    </main>
  );
}
