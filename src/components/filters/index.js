import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FilterComponent = ({
  entries,
  selectedTags,
  setSelectedTags,
  setFilteredEntries,
}) => {
  const theme = useTheme();

  let tagsArr = entries.map((entry) => entry.tags.split(","));
  let tagsFlat = tagsArr.flat();

  let tags = tagsFlat.filter((tag, index) => tagsFlat.indexOf(tag) === index);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = () => {
    setFilteredEntries(
      entries.filter((entry) => {
        if (selectedTags.length === 0) {
          return true;
        }
        let entryTags = entry.tags.split(",");
        let isMatch = false;
        entryTags.forEach((tag) => {
          if (selectedTags.includes(tag)) {
            isMatch = true;
          }
        });
        return isMatch;
      })
    );
  };
  
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Stack direction="row" spacing={3}>
        <InputLabel id="demo-multiple-chip-label" sx={{ ml: 4 }}>
          Tags
        </InputLabel>
        <Select
          height="60px"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedTags}
          onChange={handleChange}
          sx={{ width: "75%" }}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
              style={getStyles(tag, selectedTags, theme)}
            >
              {tag}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "25%", height: "40px" }}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </Stack>
    </FormControl>
  );
};

export default FilterComponent;
