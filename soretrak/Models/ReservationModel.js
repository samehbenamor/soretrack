// ReservationModel.js

export default class ReservationModel {
    constructor(nombreDesAdultes, nombreDesEnfants, nombreDeBebes, nombreDesHandicaps, fraisTotal, userId = null, ligneId = null) {
      this.userId = userId;
      this.ligneId = ligneId;
      this.nombreDesAdultes = nombreDesAdultes;
      this.nombreDesEnfants = nombreDesEnfants;
      this.nombreDeBebes = nombreDeBebes;
      this.nombreDesHandicaps = nombreDesHandicaps;
      this.fraisTotal = fraisTotal;
    }
  }
  