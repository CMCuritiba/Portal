# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s camara_de_curitiba -t test_editoria.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src camara_de_curitiba.testing.CAMARA_DE_CURITIBA_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/camara_de_curitiba/tests/robot/test_editoria.robot
#
# See the http://docs.plone.org for further details (search for robot
# framework).
#
# ============================================================================

*** Settings *****************************************************************

Resource  plone/app/robotframework/selenium.robot
Resource  plone/app/robotframework/keywords.robot

Library  Remote  ${PLONE_URL}/RobotRemote

Test Setup  Open test browser
Test Teardown  Close all browsers


*** Test Cases ***************************************************************

Scenario: As a site administrator I can add a Editoria
  Given a logged-in site administrator
    and an add Editoria form
   When I type 'My Editoria' into the title field
    and I submit the form
   Then a Editoria with the title 'My Editoria' has been created

Scenario: As a site administrator I can view a Editoria
  Given a logged-in site administrator
    and a Editoria 'My Editoria'
   When I go to the Editoria view
   Then I can see the Editoria title 'My Editoria'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add Editoria form
  Go To  ${PLONE_URL}/++add++Editoria

a Editoria 'My Editoria'
  Create content  type=Editoria  id=my-editoria  title=My Editoria

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the Editoria view
  Go To  ${PLONE_URL}/my-editoria
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a Editoria with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the Editoria title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
