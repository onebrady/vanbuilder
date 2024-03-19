import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Button from "@mui/material/Button";
import LinearWithValueLabel from "../components/ProgressBar";

const OptionCard = ({
  hyquery,
  step,
  currentGroupIndex,
  showPreviousGroup,
  showNextGroup,
  onSelectItem,
  onGroupNamesChange,
  floorOption,
  wiringHarness,
  powerSystem,
  ceilingPanel,
  ceilingLighting,
  ventalation,
  walls,
  insulation,
  trim,
  window,
}) => {
  const [currentStepArray, setCurrentStepArray] = React.useState([]);
  const [currentSelectedItem, setCurrentSelectedItem] = React.useState([]);
  //console.log(currentSelectedItem);
  // Get Group Count
  const groupCount = hyquery.reduce((sum, item) => {
    const countPerVanType = item.stepCategories.reduce(
      (innerSum, stepCategory) => {
        return innerSum + stepCategory.optionGroups.length;
      },
      0
    );
    return sum + countPerVanType;
  }, 0);

  const stepCategoriesArray = hyquery.reduce((accumulator, vanType) => {
    return accumulator.concat(vanType.stepCategories);
  }, []);
  //console.log(stepCategoriesArray);

  function getOptionGroupsById(stepCategories, id) {
    const stepCategory = stepCategories.find((category) => category.id === id);
    return stepCategory ? stepCategory.optionGroups : [];
  }

  const currentOptionGroups = getOptionGroupsById(stepCategoriesArray, step);
  const groupNames = Object.keys(currentOptionGroups);
  /* console.log(currentOptionGroups); */
  React.useEffect(() => {
    let getSelectedOption = currentOptionGroups[currentGroupIndex].id;

    switch (getSelectedOption) {
      case "clp7pxe2k7yb40bllal9wiy6o":
        setCurrentSelectedItem(floorOption);
        break;
      case "clp90zqnh9e1n0an2la46jzuw":
        setCurrentSelectedItem(wiringHarness);
        break;
      case "clp9116mq4ee10bn4136zm1dr":
        setCurrentSelectedItem(powerSystem);
        break;
      case "clpoem3ar6f4g0bn4ke845cmn":
        setCurrentSelectedItem(ceilingPanel);
        break;
      case "clpofb856gtez0blk3ha9r36s":
        setCurrentSelectedItem(ceilingLighting);
        break;
      case "clppvbaocuewr0bn4icgwgoev":
        setCurrentSelectedItem(ventalation);
        break;
      case "clpt5vqdy44j80blrpfgh2oat":
        setCurrentSelectedItem(walls);
        break;
      case "clpwz888h6nef0amzkz46l9xk":
        setCurrentSelectedItem(insulation);
        break;
      case "clpyep8g2tkmu0alqrky3v2hr":
        setCurrentSelectedItem(trim);
        break;
      case "cltykzi9rccus07lie30627uv":
        setCurrentSelectedItem(window);
        break;
    }
  }, [
    currentOptionGroups,
    currentGroupIndex,
    floorOption,
    wiringHarness,
    powerSystem,
    ceilingPanel,
    ceilingLighting,
    ventalation,
    walls,
    insulation,
    trim,
    window,
  ]);

  React.useEffect(() => {
    onGroupNamesChange(groupNames);
  }, [groupNames, onGroupNamesChange]);

  /* Get all option groups and IDs */
  const allOptionGroups = hyquery.reduce((accumulator, vanType) => {
    vanType.stepCategories.forEach((stepCategory) => {
      accumulator = accumulator.concat(stepCategory.optionGroups);
    });
    return accumulator;
  }, []);

  function getCurrentOptionGroupId(id) {
    const stepNumber = allOptionGroups.findIndex(
      (category) => category.id === id
    );
    return stepNumber + 1;
  }

  /* Get the Current Step Number */
  function getCurrentStepNumber(id) {
    const currentStep = stepCategoriesArray.findIndex(
      (category) => category.id === id
    );
    return currentStep + 1;
  }

  function findCategoryById(stepCategoriesArray, id) {
    return stepCategoriesArray.find((category) => category.id === id);
  }

  const category = findCategoryById(stepCategoriesArray, step);

  function calculatePercentage(part, total) {
    if (total === 0) {
      return 0;
    }
    return Math.round((part / total) * 100);
  }
  const currentProgress = getCurrentOptionGroupId(
    currentOptionGroups[currentGroupIndex].id
  );
  const progressPercentage = calculatePercentage(currentProgress, groupCount);
  // const getID = getCurrentitem(currentOptionGroups[currentGroupIndex].id);
  console.log(currentSelectedItem);
  return (
    <>
      {currentOptionGroups && groupNames.length > 0 && (
        <Card
          className="optionCard"
          sx={{ maxWidth: 375, marginTop: 2, borderRadius: "0 10px 10px 0" }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14 }}>
              STEP{" "}
              {getCurrentOptionGroupId(
                currentOptionGroups[currentGroupIndex].id
              )}{" "}
              / {groupCount}
            </Typography>

            <LinearWithValueLabel value={progressPercentage} />

            <Typography sx={{ fontSize: 14, paddingTop: "10px" }} gutterBottom>
              {category.name}
            </Typography>

            {currentOptionGroups[currentGroupIndex].name && (
              <Typography
                sx={{ paddingBottom: "0px" }}
                variant="h5"
                component="div"
              >
                {currentOptionGroups[currentGroupIndex].name}
              </Typography>
            )}
            <Typography
              sx={{ fontSize: 14, paddingBottom: "10px" }}
              gutterBottom
            >
              {category.optionGroups[0].description}
            </Typography>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>

              <RadioGroup
                aria-labelledby="Radio Buttons"
                // defaultValue="female"
                name={category.optionGroups[0].id}
              >
                {currentOptionGroups[currentGroupIndex].optionGroup.map(
                  (item, index) => (
                    <div key={item.id}>
                      <FormControlLabel
                        checked={currentSelectedItem?.id == item.id}
                        value={item.name}
                        control={<Radio />}
                        label={item.name}
                        onChange={(e) => {
                          onSelectItem(
                            item,
                            currentOptionGroups[currentGroupIndex].id
                          );
                        }}
                      />

                      {item.toolTip && (
                        <Tooltip title={item.toolTip} arrow>
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  )
                )}
              </RadioGroup>
            </FormControl>

            <>
              <div className="card-buttons">
                <IconButton
                  aria-label="ArrowCircleLeftIcon"
                  onClick={showPreviousGroup}
                  disabled={
                    getCurrentOptionGroupId(
                      currentOptionGroups[currentGroupIndex].id
                    ) === 1
                  }
                >
                  <ArrowCircleLeftIcon />
                </IconButton>
                <IconButton
                  aria-label="ArrowCircleRightIcon"
                  onClick={showNextGroup}
                  disabled={
                    getCurrentOptionGroupId(
                      currentOptionGroups[currentGroupIndex].id
                    ) === groupCount
                  }
                >
                  <ArrowCircleRightIcon />
                </IconButton>
              </div>
            </>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default OptionCard;
