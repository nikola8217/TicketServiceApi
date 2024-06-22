import express from 'express';
import { ConcertController } from '../controllers/concert.controller';
import { createConcertRules, buyTicketRules } from '../validation/concert.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth'; 

const router = express.Router();

router.route('/')
    .post(createConcertRules, requireAuth, validateRequest, ConcertController.createConcert)
    .get(ConcertController.getAllConcerts);
router.route('/:id').get(ConcertController.getSingleConcert);
router.route('/buyTicket/:id').post(buyTicketRules, requireAuth, validateRequest, ConcertController.buyTicket);

const concertRouter = router;

export { concertRouter };