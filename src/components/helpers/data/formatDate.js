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
    return new Date(date).toLocaleDateString();
}

export default formatDate;