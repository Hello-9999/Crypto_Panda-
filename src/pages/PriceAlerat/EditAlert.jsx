import React from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";

const EditAlert = ({ Open, setOpen, data, Editdetails }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const editdata = data.filter((check) => {
    return check.delid === Editdetails.delid;
  });
  console.log(editdata,'data')

  //   console.log(editdata[0].alertprice, "EDitdata");
  return (
    <>
      {/* <Modal ></Modal>{" "} */}
      <Modal
        open={Open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ backgroundColor: "grey" }}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Edit Price Alert
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h6> Coin</h6>
            <div className="title">
              {" "}
              <div className="name">
                {" "}
                <div className="img">
                  <img src={"editdata[0].Coindetails.iconUrl"} alt="e" />
                </div>
              </div>{" "}
              <div className="value"></div>
            </div>
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <div className="alert-title">
              {" "}
              <h6>Price alert</h6>
            </div>{" "}
            <div className="edit-input">
              {/* <TextField value={editdata[0].alertprice} /> */}
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default EditAlert;
