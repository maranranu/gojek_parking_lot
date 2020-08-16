# Parking Lot

## Description
  - Build parking-lot system in object oriented fashion.
  - Take input as file or through command

## Installation
Nodejs

## Setup
   - bin/setup : to install node packages and its dependencies and run test suite
   - bin/parking_lot : Run application and it takes an input file as an argument and prints the output on STDOUT
         - Interactive mode: bin/parking_lot
         - File mode: bin/parking_lot false functional_spec/fixtures/file_input.txt

## Complexity analysis
  - Data structure: Minimum Heap Tree and hash
  - Insertion, removal : O(logn) : HeapTree
  - Get minimum (nearest neighbour) O(1) : HeapTree

#Nodejs external library
  - chai : For unit testing
  - mocha : For unit testing
  - colors : To print output in colors

#Controller Logic
  - ParkingLot
    - createParkingSlots : Parking lot alloted with some size
    - getParkingStatus : Fetch occupied slots from occupied dictionary
    - parkCar : Get minimum free slot (fetch minimum from heap tree O(1)), and update dictionary parkingDetails (key : registration number and value: ticket object, car object and slot number assigned to this vehicle)
    - leaveVehicle : Update exit time in ticket, payment cost and remove entry from occupied dictionary and set this slot in free slot heap tree.

#Drawbacks
  - For scaling, architecture has to be updated, dictionary will be replaced by database.
