/**
 * @description Retorna uma data formatada.
 *
 * @author Lucas Ronchi <@lucas0headshot>
 *
 * @param {string} date
 *
 * @return {string}
 */
const formatDate = (date) => {
    return new Date(`${date} 00:00:00`).toLocaleDateString();
}

export default formatDate;