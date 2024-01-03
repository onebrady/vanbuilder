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

  const [hyquery, setHyQuery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [step, setStep] = useState("clp20yr1ac0q10an660ovlpjw");
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [floorOption, setFloorOption] = useState([]);
  const [wiringHarness, setWiringHarness] = useState([]);
  const [powerSystem, setPowerSystem] = useState([]);
  const [ceilingPanel, setCeilingPanel] = useState([]);
  const [ceilingLighting, setCeilingLighting] = useState([]);
  const [ventalation, setVentalation] = useState([]);
  const [walls, setWalls] = useState([]);
  const [insulation, setInsulation] = useState([]);
  const [trim, setTrim] = useState([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState([]);

  const [groupNamesFromChild, setGroupNamesFromChild] = useState([]);

  const handleGroupNames = (groupNames) => {
    setGroupNamesFromChild(groupNames.length);
  };
  // console.log(groupNamesFromChild);

  const uniqueStepCategories = hyquery.reduce((accumulator, vanType) => {
    vanType.stepCategories.forEach((stepCategory) => {
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
  }, []);
  // console.log(getNextId(uniqueStepCategories, step));
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

  function getNextId(items, currentId) {
    const currentIndex = items.findIndex((item) => item.id === currentId);
    if (currentIndex === -1 || currentIndex === items.length - 1) {
      return currentId;
    }
    return items[currentIndex + 1].id;
  }

  function getPreviousId(items, currentId) {
    const currentIndex = items.findIndex((item) => item.id === currentId);
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
        setCurrentSelectedItem(item);
        localStorage.setItem("lsFloorOption", JSON.stringify(item));
        break;
      case "clp90zqnh9e1n0an2la46jzuw":
        setWiringHarness(item);
        setCurrentSelectedItem(item);
        localStorage.setItem("lsWiringHarness", JSON.stringify(item));
        break;
      case "clp9116mq4ee10bn4136zm1dr":
        setPowerSystem(item);
        setCurrentSelectedItem(item);
        localStorage.setItem("lsPowerSystem", JSON.stringify(item));
        break;
      case "clpoem3ar6f4g0bn4ke845cmn":
        setCeilingPanel(item);
        setCurrentSelectedItem(item);
        localStorage.setItem("lsCeilingPanel", JSON.stringify(item));
        break;
      case "clpofb856gtez0blk3ha9r36s":
        setCeilingLighting(item);
        setCurrentSelectedItem(item);
        localStorage.setItem("lsCeilingLighting", JSON.stringify(item));
        break;
      case "clppvbaocuewr0bn4icgwgoev":
        setCeilingLighting(item);
        setCurrentSelectedItem(item);
        localStorage.setItem("lsVentilation", JSON.stringify(item));
        break;
      case "clpt5vqdy44j80blrpfgh2oat":
        setWalls(item);
        setCurrentSelectedItem(item);
        localStorage.setItem("lsWalls", JSON.stringify(item));
        break;
      case "clpwz888h6nef0amzkz46l9xk":
        setInsulation(item);
        setCurrentSelectedItem(item);
        localStorage.setItem("lsInsulation", JSON.stringify(item));
        break;
      case "clpyep8g2tkmu0alqrky3v2hr":
        setTrim(item);
        setCurrentSelectedItem(item);
        localStorage.setItem("lsTrim", JSON.stringify(item));
        break;
    }
  };

  const allOptionGroups = hyquery.reduce((accumulator, vanType) => {
    vanType.stepCategories.forEach((stepCategory: string) => {
      accumulator = accumulator.concat(stepCategory.optionGroups);
    });
    return accumulator;
  }, []);

  function loadDefaults() {
    let stepCheck = localStorage.getItem("step");
    let floorStep = JSON.parse(localStorage.getItem("lsFloorOption"));
    let floorDefault = getDefaultItem(allOptionGroups, floorColorId);

    let localWireHarness = JSON.parse(localStorage.getItem("lsWiringHarness"));
    let WireHarnessDefault = getDefaultItem(allOptionGroups, wireHarnessId);

    let localPowerSystem = JSON.parse(localStorage.getItem("lsPowerSystem"));
    let PowerSystemDefault = getDefaultItem(allOptionGroups, powerSystemId);

    let localCeilingPanel = JSON.parse(localStorage.getItem("lsCeilingPanel"));
    let CeilingPanelDefault = getDefaultItem(allOptionGroups, ceilingPanelId);

    let localVentilation = JSON.parse(localStorage.getItem("lsVentilation"));
    let VentilationDefault = getDefaultItem(allOptionGroups, ventilationId);

    let localCeilingLighting = JSON.parse(
      localStorage.getItem("lsCeilingLighting")
    );
    let CeilingLightingDefault = getDefaultItem(
      allOptionGroups,
      CeilingLightingId
    );

    let localWalls = JSON.parse(localStorage.getItem("lsWalls"));
    let WallsDefault = getDefaultItem(allOptionGroups, wallPanelsId);

    let localInsulation = JSON.parse(localStorage.getItem("lsInsulation"));
    let InsulationDefault = getDefaultItem(allOptionGroups, wallInsulationId);

    let localTrim = JSON.parse(localStorage.getItem("lsTrim"));
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
    const item = hyquery.find((item) => item.id === id);
    return item && item.image ? item.image.url : null;
  }
  const vanBaseImage = getFirstImageUrl(hyquery, "clp20wntffhgf0blutxpdtbcd");

  function getDefaultItem(data, optionGroupId) {
    const optionGroup = data.find((group) => group.id === optionGroupId);
    if (optionGroup && optionGroup.optionGroup) {
      return optionGroup.optionGroup.find((item) => item.defaultItem === true);
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

            {ceilingLighting?.image && (
              <OverlayImages vanimage={ceilingLighting.image?.url} />
            )}
            {ventalation?.image && (
              <OverlayImages vanimage={ventalation.image?.url} />
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
              currentSelectedItem={currentSelectedItem}
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
