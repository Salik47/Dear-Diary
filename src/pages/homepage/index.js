import React, { useEffect, useState } from "react";
import { Box, Modal, CircularProgress, Stack, Typography } from "@mui/material";
import { StorageService } from "../../services/storage";
import { BriefEntry } from "../../components/brief-entry";
import { FullEntry } from "../../components/full-entry";
import FilterComponent from "../../components/filters";

const Homepage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState(entries);

  const fetchEntries = () => {
    setLoading(true);
    const allEntries = StorageService.fetchAllEntries();
    setTimeout(() => {
      setEntries(allEntries);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Typography variant="h2">All Entries</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <FilterComponent
              entries={entries}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              setFilteredEntries={setFilteredEntries}
            />
            {filteredEntries.length === 0
              ? entries.map((entry) => (
                  <BriefEntry
                    title={entry.title}
                    tags={entry.tags}
                    createdAt={entry.createdAt}
                    onViewClick={() => {
                      setOpenModal(true);
                      setSelectedEntry(entry);
                    }}
                  />
                ))
              : filteredEntries.map((entry) => (
                  <BriefEntry
                    title={entry.title}
                    tags={entry.tags}
                    createdAt={entry.createdAt}
                    onViewClick={() => {
                      setOpenModal(true);
                      setSelectedEntry(entry);
                    }}
                  />
                ))}
            {}
          </>
        )}
      </Stack>
      <Modal open={openModal}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Box sx={{ width: "100%", maxWidth: "80vw" }}>
            {selectedEntry != null && (
              <FullEntry
                title={selectedEntry.title}
                tags={selectedEntry.tags}
                notes={selectedEntry.notes}
                createdAt={selectedEntry.createdAt}
                onClose={() => setOpenModal(false)}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export { Homepage };
