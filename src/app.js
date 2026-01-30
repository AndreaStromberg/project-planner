const projectApp = () => {
  // Hämta element från DOM
  const projectForm = document.querySelector("#project-form")
  const projectList = document.querySelector("#project-list")

  //funktion för att skapa projekt
  const createProject = (event) => {
    // Förebygga att sidan laddas om och allt försvinner ur formuläret
    event.preventDefault()

    // Hämta in all data från formuläret, namn, datum, mm, spara som FormData Object
    const formData = new FormData(projectForm)

    // Skapa ett JS-objekt av den data som hämtats in från formuläret
    const projectData = Object.fromEntries(formData.entries())

    // lägger till projektstatus till projektdata
    projectData.status = ""

    // Hämta ut ProjectData Entries från Objektet
    // Grejerna från ? och framåt är en säkerhet och koll på vad som ska ske om det saknas info i formuläret
    const createdBy = projectData["created-by"]
      ? // Om namnet finns skrivs det ut
        projectData["created-by"]
      : //   Annars skriver den anonymous
        "anonymous"

    const projectName = projectData["project-name"]
    const projectDueDate = projectData["project-due-date"]
    const projectLink = projectData["project-link"]
    const projectStatus = projectData["status"]

    // Kolla om projektet kan skapas
    if (!projectName) return

    // Skapa ett list-item med projektelement
    const projectElement = document.createElement("li")

    // Skapa en mall för hur projektet ska se ut, project template
    const projectTemplate = `
                    <div
                        class="flex justify-between items-center border-b border-b-white/5 py-4 hover:bg-white/2 -mx-4 px-4">
                        <!-- Vänstersidan, info om projekten -->
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="text-sm font-semibold">${projectName}</h3>
                                <span ${projectStatus ? projectStatus : ""}
                                    class="text-xs bg-white/5 outline outline-white/10 -outline-offset-1 py-0.5 px-1.5 founded-sm text-gray-400 font-medium data-archived:bg-amber-400/10 data-archived:text-amber-400 data-archived:outline-amber-400/10 data-completed:bg-green-400/10 data-completed:text-green-400 data-completed:outline-green-400/10">${projectStatus ? projectStatus : "In progress"} </span>

                            </div>

                            <div>
                                <span class="text-xs text-gray-400">${projectDueDate ? "Due on " + projectDueDate : "No due date"} - Created by ${createdBy}</span>

                            </div>
                        </div>


                        <!-- Högersidan, knappar -->
                        <div class="flex items-center gap-4">
                            <a href="${projectLink}
                                class="${!projectLink ? "hidden" : ""} text-sm bg-gray-700 py-1.5 px-3 rounded-sm hover:bg-gray-600 cursor-pointer">View
                                project</a>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                </svg>


                            </button>
                        </div>

                    </div>`

    // Lägg till templaten i projektelementet
    projectElement.innerHTML = projectTemplate

    // Lägg till projektelementet i listan över projekt
    projectList.append(projectElement)
  }

  //event
  projectForm.addEventListener("submit", createProject)
}

projectApp()
