/**
 * @description Retorna o dia de uma data.
 *
 * @author Lucas Ronchi <@lucas0headshot>
 *
 * @param {string} date
 *
 * @return {string}
 */
const getDayFromDate = (date) => {
    return new Date(`${date} 00:00:00`).getDate();
}

export default getDayFromDate;